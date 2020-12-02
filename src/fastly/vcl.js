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
const path = require('path');
const {
  include,
  synthetize,
  regex,
  injectConsts,
} = require('./include-util');
const {
  resolve,
  parameters,
  xversion,
  writevcl,
  preflightHeaders,
} = require('./vcl-utils');
const defaultVersions = require('../default-versions.js');

const { queryvcl } = require('./algolia');

const addEpsagonTraces = require('../vcl/tracer');

const package = require('../../package.json');

const urlFilters = require('../rgx/block.js');

function basedir() {
  return __filename !== 'vcl.js' ? '' : path.resolve(__dirname, '../..');
}

async function init(fastly, version, options, config, versions) {
  const vclfile = path.resolve(basedir(), 'layouts/fastly/helix.vcl');
  let content = options
    ? include(vclfile, addEpsagonTraces, {
      serviceId: options.serviceid,
      loggerName: options.logname,
      epsagonToken: options.token,
      epsagonAppName: options.appName,
    })
    : include(vclfile);
  content = regex(content, urlFilters);

  // create the constants object
  const constants = {
    preflight: config.preflight ? config.preflight.replace('https://adobeioruntime.net', '') : undefined,
  };

  // define default version constants
  const defVersions = {
    ...defaultVersions,
    ...versions,
  };
  Object.values(defVersions).forEach((k, v) => {
    constants[`${k}_version`] = v;
  });
  content = injectConsts(content, constants);
  return writevcl(fastly, version, content, 'helix.vcl');
}

async function finish(fastly, version) {
  // called when all custom vcl scripts have been updated,
  // now it's safe to set the main script
  // https://github.com/adobe/helix-publish/issues/549
  return fastly.setMainVCL(version, 'helix.vcl');
}

async function extensions(fastly, version, vclOverride = {}) {
  const vclfile = path.resolve(basedir(), 'layouts/fastly/extensions.vcl');
  let content;
  if (vclOverride.extensions) {
    // found a extensions.vcl override
    content = synthetize(vclOverride.extensions, path.dirname(vclfile));
  } else {
    content = include(vclfile);
  }
  return writevcl(fastly, version, content, 'extensions.vcl');
}

function updatestrains(fastly, version, strains, config) {
  return Promise.all([
    writevcl(fastly, version, resolve(strains, config.preflight), 'strains.vcl'),
    writevcl(fastly, version, parameters(strains), 'params.vcl'),
    writevcl(fastly, version, preflightHeaders(config), 'preflight.vcl'),
  ]);
}

function dynamic(fastly, version) {
  let content = '';
  content += xversion(version, package.version);
  return Promise.all([
    writevcl(fastly, version, content, 'dynamic.vcl'),
  ]);
}

function queries(fastly, version, indexconfig) {
  const content = queryvcl(indexconfig.indices || []);
  return writevcl(fastly, version, content, 'queries.vcl');
}

module.exports = {
  init,
  finish,
  updatestrains,
  extensions,
  dynamic,
  queries,
};
