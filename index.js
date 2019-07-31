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
const { logger: setupLogger } = require('@adobe/openwhisk-action-builder/src/logging');
const { wrap } = require('@adobe/helix-pingdom-status');
const publish = require('./src/publish');

// global logger
let log;

async function publishConfig(params) {
  const result = await publish(
    params.configuration,
    params.service,
    params.token,
    params.version,
    params.vcl,
    params.dispatchVersion,
    log,
  );

  return result;
}

/**
 * Runs the action by wrapping the `publishConfig` function with the pingdom-status utility.
 * Additionally, if a EPSAGON_TOKEN is configured, the epsagon tracers are instrumented.
 * @param params Action params
 * @returns {Promise<*>} The response
 */
async function run(params) {
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
      ignoredKeys: ['EPSAGON_TOKEN', 'token'],
    });
  }
  return wrap(action, {
    fastly: 'https://api.fastly.com/',
  })(params);
}

/**
 * Main function called by the openwhisk invoker.
 * @param params Action params
 * @param logger Existing logger to use (mainly for testing)
 * @returns {Promise<*>} The response
 */
async function main(params, logger = log) {
  try {
    log = setupLogger(params, logger);
    const result = await run(params);
    if (log.flush) {
      log.flush(); // don't wait
    }
    return result;
  } catch (e) {
    console.error(e);
    return {
      statusCode: e.statusCode || 500,
    };
  }
}

module.exports.main = main;
