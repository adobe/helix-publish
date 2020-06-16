/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const glob = require('glob-to-regexp');

function writevcl(fastly, version, content, name, main) {
  return fastly.writeVCL(
    version,
    name,
    {
      content,
      name,
      main,
    },
  );
}

function regexp(globs) {
  return globs.map(glob).map((re) => re.toString().replace(/^\/|\/$/g, '')).join('|');
}

function vclbody(arr = []) {
  return arr;
}

function conditions([strain, vcl]) {
  if (strain.condition) {
    const result = [strain, {
      sticky: false,
      condition: strain.condition.toVCL(),
      body: [...vclbody(vcl.body),
        strain.condition.toVCLPath((_, subpath) => `set req.http.X-Dirname = regsub(req.http.X-FullDirname, "^${subpath}", "");
set req.http.X-Root-Path = "${subpath}";`),
      ].filter((line) => line),
    }];
    return result;
  }
  return [strain, vcl];
}

/**
 * Creates a VCL snippet for Proxy Strains that tells the
 * downstream processing that this is a proxy strain and
 * what the backend is that should handle the requests.
 */
function proxy([strain, vcl]) {
  if (strain.origin && typeof strain.origin === 'object') {
    const body = vclbody(vcl.body);
    body.push(`
# Enable passing through of requests

set req.http.X-Proxy = "${strain.origin.useSSL ? 'https' : 'http'}://${strain.origin.address}:${strain.origin.port}/";
set req.http.X-Proxy-Root = "${strain.origin.path}";
set req.http.X-Request-Type = "Proxy";

set req.backend = F_${strain.origin.name};
set req.http.host = "${strain.origin.hostname}";
`);
    return [strain, Object.assign(vcl, { body })];
  }
  return [strain, vcl];
}

function proxyurls([strain, vcl]) {
  let oldpath;
  if (strain.condition) {
    oldpath = strain.condition.toVCLPath((_, subpath) => subpath);
  }
  oldpath = oldpath || '/';

  const newpath = (strain.origin && strain.origin.path) ? strain.origin.path : '/';

  if (oldpath !== '/' || newpath !== '/') {
    const body = vclbody(vcl.body);

    body.push(`# Rewrite the URL to include the proxy path
set req.url = regsub(req.url, "^${oldpath}", "${newpath}");`);
    return [strain, Object.assign(vcl, { body })];
  }
  return [strain, vcl];
}

/**
 * Generates the VCL snippet to set the X-Sticky header
 * @param {*} param0
 */
function stickybody([strain, argvcl]) {
  const vcl = argvcl;
  vcl.body = vclbody(vcl.body);
  if (strain.sticky || vcl.sticky) {
    vcl.body.push('set req.http.X-Sticky = "true";');
  } else {
    vcl.body.push('set req.http.X-Sticky = "false";');
  }
  return [strain, vcl];
}

/**
 * Generates the VCL snippet to set the X-Name header
 * @param {*} param0
 */
function namebody([strain, vcl]) {
  vcl.body.push(`set req.http.X-Strain = "${strain.name}";`);

  return [strain, vcl];
}

function resolve(mystrains) {
  const strains = Array.from(mystrains.values());
  let retvcl = '# This file handles the strain resolution\nset req.http.X-Root-Path = "";\n';
  const strainconditions = strains
    .map((strain) => [strain, { body: vclbody() }])
    .map(conditions)
    .map(proxy)
    .map(proxyurls)
    .map(stickybody)
    .map(namebody)
    .filter(([strain, vcl]) => (strain.condition && strain.condition.toVCL()) || vcl.condition)
    .map(([strain, vcl]) => `if (${(strain.condition && strain.condition.toVCL()) || vcl.condition}) {
${vcl.body.map((snippet) => snippet.split('\n').map((line) => `  ${line}`).join('\n')).join('\n')}
} else `);
  if (strainconditions.length) {
    retvcl += strainconditions.join('');
    retvcl += `{
  set req.http.X-Strain = "default";
}`;
  } else {
    retvcl += 'set req.http.X-Strain = "default";\n';
  }
  return retvcl;
}

function fname(name) {
  return `F_${name.replace(/[^A-Z0-9_]/ig, '_')}`;
}

function shielding({ name }) {
  return `if (req.backend == ${fname(name)} && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = ${fname(name)};
  }
}`;
}

/**
 * Generates VCL to reset backends, so that shielding is enforced for each
 * backend.
 * @param {*} mystrains
 */
function reset(backends) {
  let retval = '# This file resets shielding for all known backends\n';

  const origins = {};
  Object.values(backends).forEach((backend) => {
    origins[backend.name] = backend;
  });

  const backendresets = Object.values(origins).map(shielding);

  retval += backendresets.join('\n');

  return retval;
}

/**
   * Turns a list of parameter names into a regular expression string.
   * @param {Array<String>} params a list of parameter names
   */
function filter(params) {
  return regexp([...params, 'hlx_*']);
}

function allowlist(params, indent = '') {
  return `set req.http.X-Old-Url = req.url;
set req.url = querystring.regfilter_except(req.url, "${filter(params)}");
set req.http.X-Encoded-Params = urlencode(req.url.qs);
set req.url = req.http.X-Old-Url;`
    .split('\n')
    .map((line) => indent + line)
    .join('\n');
}

/**
   * Generates VCL for strain resolution from a list of strains
   */
function parameters(strains) {
  let retvcl = `# This file handles the URL parameter allowlist
`;
  const otherstrains = strains.getByFilter((strain) => strain.params
    && strain.params.length);

  retvcl += otherstrains.map(({ name, params }) => `if (req.http.X-Strain == "${name}") {
${allowlist(params, '  ')}
}`).join(' else');

  if (otherstrains.length) {
    retvcl += ` else {
  # default parameters, can be overridden per strain
${allowlist([], '  ')}
}`;
  } else {
    retvcl += `# default parameters, can be overridden per strain
${allowlist([])}`;
  }

  return retvcl;
}

function xversion(configVersion, cliVersion, revision = 'online') {
  let retvcl = '# This file shows the current version\n';

  const version = `; src=${configVersion}; cli=${cliVersion}; rev=${revision}`;

  retvcl += `set req.http.X-Version = req.http.X-Version + "${version}";\n`;

  return retvcl;
}

function reqHeader(name, value) {
  return `set req.http.${name} = "${value}";\n`;
}

/**
 * Turns regex-like replacement patterns into valid VCL statements, e.g. `/foo/$1.html` becomes
 * `"/foo/" + re.group.1 + ".html"`
 * @param {string} pattern - a replacement pattern that may include regex-like references like `$1`
 */
function pattern2vcl(pattern) {
  return `"${pattern.replace(/\$([0-9])/g, '" + re.group.$1 + "')}"`;
}

/**
 * Turns a regex-pattern (on the full URL, if it starts with `https://`, on the path and QS only, otherwise)
 * into a valid VCL condition that also checks for a matching X-Strain header value.
 * @param {string} pattern - a regex-like pattern
 * @param {string} strain - name of the strain
 */
function condition(pattern, strain) {
  const varname = pattern.match(/^https:\/\//) ? '("https://" + req.http.host + req.url.path)' : 'req.url.path';
  return `req.http.X-Strain == "${strain}" && ${varname} ~ "${pattern}"`;
}

module.exports = {
  resolve, reset, parameters, xversion, regexp, writevcl, pattern2vcl, condition, reqHeader,
};
