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
const { logger } = require('@adobe/helix-universal-logger');
const wrap = require('@adobe/helix-shared-wrap');
const { wrap: status } = require('@adobe/helix-status');
const { Response } = require('@adobe/helix-fetch');
const publish = require('./publish');

async function publishConfig(request, context) {
  context.log.info('helix-publish: parsing body ');
  const text = await request.text();
  context.log.info(`body text: ${text}`);
  const params = JSON.parse(text);

  const res = await publish({
    configuration: params.configuration,
    service: params.service,
    token: params.token,
    version: params.version,
    vclOverrides: params.vcl,
    // eslint-disable-next-line no-underscore-dangle
    log: context.log,
    iconfig: params.indexconfig,
    algoliaappid: params.algoliaappid,
    epsagonToken: params.epsagontoken,
    epsagonAppName: params.epsagonapp,
  });

  return new Response(res.body, {
    status: res.statusCode,
    headers: res.headers,
  });
}

/**
 * Main function called by the openwhisk invoker.
 * @param params Action params
 * @returns {Promise<*>} The response
 */
module.exports.main = wrap(publishConfig)
  .with(status)
  .with(logger.trace)
  .with(logger);
