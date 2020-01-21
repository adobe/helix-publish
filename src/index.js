/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const { logger } = require('@adobe/openwhisk-action-logger');
const { wrap } = require('@adobe/openwhisk-action-utils');
const { wrap: status } = require('@adobe/helix-status');
const publish = require('./publish');

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
    params.indexconfig,
    params.algoliaappid,
  );
}

/**
 * Instruments the action with epsagon, if a EPSAGON_TOKEN is configured.
 */
function epsagon(action) {
  return async (params) => {
    if (params && params.EPSAGON_TOKEN) {
      const { __ow_logger: log } = params;
      // ensure that epsagon is only required, if a token is present.
      // This is to avoid invoking their patchers otherwise.
      // eslint-disable-next-line global-require
      const { openWhiskWrapper } = require('epsagon');
      log.info('instrumenting epsagon.');
      // eslint-disable-next-line no-param-reassign
      action = openWhiskWrapper(action, {
        token_param: 'EPSAGON_TOKEN',
        appName: 'Helix Services',
        metadataOnly: false, // Optional, send more trace data
        ignoredKeys: ['EPSAGON_TOKEN', 'token', /[A-Z0-9_]+/],
      });
    }
    return action(params);
  };
}

/**
 * Main function called by the openwhisk invoker.
 * @param params Action params
 * @returns {Promise<*>} The response
 */
module.exports.main = wrap(publishConfig)
  .with(epsagon)
  .with(status)
  .with(logger.trace)
  .with(logger);
