/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const Parser = require('./parser');
const {
  toString, vcl, str,
} = require('./schemahelper');

// list of values to ignore every time
const ignore = [
  'beresp.http.X-PreFetch-Miss',
  'beresp.http.X-PreFetch-Pass',
  'beresp.http.X-PostFetch',
  'beresp.http.X-Trace',
  'obj.http.X-PostFetch',
  'obj.http.X-PreFetch-Miss',
  'obj.http.X-PreFetch-Pass',
  'obj.http.X-Trace',
  'req.http.X-PostFetch',
  'req.http.X-PreFetch-Miss',
  'req.http.X-PreFetch-Pass',
  'req.http.X-Trace',
  'resp.http.X-Trace',
  'bereq.http.Authorization',
  'req.http.X-CDN-Request-ID',
  'req.http.X-Request-ID',
  'req.http.Set-Cookie',
];

// list of values to include every time (remember that only req is readable at any time)
const alwaysinclude = [
];

/**
 * List all vars that have been set in a subroutine and add them to the data
 */
function logvars(start) {
  const usedvars = [...alwaysinclude, ...Array.from(start.vars)].reduce((data, varname) => {
    if (!ignore.includes(varname)) {
      // eslint-disable-next-line no-param-reassign
      data[varname] = vcl([varname]);
    }
    return data;
  }, {});

  return {} || usedvars;
}

function addEpsagonTraces(txt, {
  serviceId, loggerName, epsagonToken, epsagonAppName,
}) {
  function formatLog(schema) {
    return `log {"syslog ${serviceId} ${loggerName} :: "} ${toString(schema)};`;
  }

  const minimal = {
    id: vcl`req.http.x-request-id`,
    t: {
      // start time of the request in microseconds since 1970
      s: vcl`time.start.usec`,
      // elapsed time in request processing. Add time.start to get current time
      e: vcl`time.elapsed.usec`,
    }
  };

  const normal = {
    ...minimal,
    a: str(epsagonAppName || 'Helix Fastly Epsagon'),
    r: {
      h: vcl`req.http.Host`,
      u: vcl`req.url`,
      t: vcl`req.topurl`,
    },
    f: {
      // https://developer.fastly.com/reference/vcl/variables/miscellaneous/fastly-info-state/
      i: vcl`fastly_info.state`,
      // https://developer.fastly.com/reference/vcl/variables/miscellaneous/fastly-error/
      e: vcl`fastly.error`,
      // https://developer.fastly.com/reference/vcl/variables/miscellaneous/req-vcl/
      v: vcl`req.vcl`,
      // https://developer.fastly.com/reference/vcl/variables/server/server-identity/
      s: vcl`server.identity`,
    }
  };

  const PATTERN = /^vcl_/;
  /**
   * Entering a subroutine, data is empty because no vars have been set yet
   */
  function tracesubentry({ name }) {
    return PATTERN.test(name) ? formatLog({
      ...minimal,
      enter: str(name),
      d: {},
    }) : '';
  }

  /*
   * Exiting a subroutine normally
  */
  function tracesubexit({ name, start }) {
    return PATTERN.test(name) ? formatLog({
      ...normal,
      leave: str(name),
      d: logvars(start),
    }) : '';
  }

  /**
  * Return from a subroutine to a defined state in the state machine
  */
  function tracereturn({ name, to, start }) {
    return PATTERN.test(name) ? formatLog({
      ...normal,
      leave: str(name),
      next: str(to),
      d: logvars(start),
    }) : '';
  }

  /**
  * Calling a different subroutine
 */
  function tracecall({ name, to, start }) {
    return PATTERN.test(name) ? formatLog({
      ...minimal,
      from: str(name),
      call: str(to),
    }) : '';
  }

  return new Parser(txt)
    .parse()
    .on('substart', { after: tracesubentry })
    .on('subend', { before: tracesubexit })
    .on('return', { before: tracereturn })
    .on('call', { before: tracecall })
    .transform();
}

module.exports = addEpsagonTraces;
