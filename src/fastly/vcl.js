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
const include = require('./include-util');
const {
  resolve,
  reset,
  parameters,
  xversion,
} = require('./vcl-utils');
const package = require('../../package.json');

function vcl(fastly, version, content, name, main) {
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

async function init(fastly, version) {
  const vclfile = path.resolve(__dirname, '../../layouts/fastly/helix.vcl');
  const content = include(vclfile);
  await vcl(fastly, version, 'helix.vcl', content);
  return fastly.setMainVCL(version, 'helix.vcl');
}

function updatestrains(fastly, version, strains) {
  return Promise.all([
    vcl(fastly, version, resolve(strains), 'strains.vcl'),
    vcl(fastly, version, parameters(strains), 'params.vcl'),
    vcl(fastly, version, xversion(version, package.version), 'dynamic.vcl'),
    vcl(fastly, version, reset(strains), 'reset.vcl'),
  ]);
}

module.exports = {
  init,
  updatestrains,
};
