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
const { logger } = require('@adobe/openwhisk-action-utils');
const { wrap } = require('@adobe/helix-status');
const publish = require('./src/publish');

async function publishConfig(params) {
  return publish(
    params.configuration,
    params.service,
    params.token,
    params.version,
    params.vcl,
    params.dispatchVersion,
    // eslint-disable-next-line no-underscore-dangle
    params.__ow_logger,
  );
}

/**
 * Runs the action by wrapping the `publishConfig` function with the pingdom-status utility.
 * Additionally, if a EPSAGON_TOKEN is configured, the epsagon tracers are instrumented.
 * @param params Action params
 * @returns {Promise<*>} The response
 */
async function run(params) {
  const { __ow_logger: log } = params;
  let action = publishConfig;
  if (params && params.EPSAGON_TOKEN) {
    // ensure that epsagon is only required, if a token is present. this is to avoid invoking their
    // patchers otherwise.
    // eslint-disable-next-line global-require
    const { openWhiskWrapper } = require('epsagon');
    log.info('instrumenting epsagon.');
    action = openWhiskWrapper(action, {
      token_param: 'EPSAGON_TOKEN',
      appName: 'Helix Services',
      metadataOnly: false, // Optional, send more trace data
      ignoredKeys: ['EPSAGON_TOKEN', 'token', /[A-Z0-9_]+/],
    });
  }
  return wrap(action, {
    fastly: 'https://api.fastly.com/',
  })(params);
}

/**
 * Main function called by the openwhisk invoker.
 * @param params Action params
 * @returns {Promise<*>} The response
 */
async function main(params) {
  return logger.wrap(run, params);
}

module.exports.main = main;
