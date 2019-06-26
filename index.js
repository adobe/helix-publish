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
const epsagon = require('epsagon');

const status = require('@adobe/helix-pingdom-status');
const publish = require('./src/publish');

async function main(params) {
  const result = await publish(
    params.configuration,
    params.service,
    params.token,
    params.version,
    params.vcl,
  );

  return result;
}

module.exports.main = status.main(epsagon.openWhiskWrapper(main, {
  token_param: 'EPSAGON_TOKEN',
  appName: 'Helix Services',
  metadataOnly: false,
}), { fastly: 'https://api.fastly.com/' });
