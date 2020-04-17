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

const { HelixConfig, IndexConfig } = require('@adobe/helix-shared');
const initfastly = require('@adobe/fastly-native-promises');
const backends = require('./fastly/backends');
const vcl = require('./fastly/vcl');
const dictionaries = require('./fastly/dictionaries');
const redirects = require('./fastly/redirects');
const { checkPkgs } = require('./check-pkgs');
/**
 *
 * @param {object} configuration the Helix Strains configuration
 * @param {string} service the Fastly Service ID
 * @param {string} token the Fastly Auth token
 * @param {string} version the Helix CLI version
 * @param {object} vclOverrides the VCL overrides (extension points)
 * @param {string} dispatchVersion the helix-dispatch microservice version to use
 * @param {object} log a logger
 * @param {object} iconfig the IndexConfig from helix-shared
 * @param {string} algoliaappid Algolia App ID (not secret)
 */
async function publish(configuration, service, token, version, vclOverrides = {}, dispatchVersion = 'v3', log = console, iconfig, algoliaappid, wskAuth, wskHost, wskNamespace) {
  if (!(!!token && !!service)) {
    log.error('No token or service.');
    return {
      body: {
        status: 'missing credentials',
      },
      statusCode: 401,
    };
  }

  try {
    const config = await new HelixConfig()
      .withLogger(log)
      .withJSON(configuration)
      .init();

    const indexconfig = await new IndexConfig()
      .withLogger(log)
      .withJSON(iconfig)
      .init();

    await checkPkgs(wskAuth, wskHost, wskNamespace, config, log);
    const fastly = await initfastly(token, service);
    log.info('running publishing tasks...');
    return Promise.all([
      backends.init(fastly, version, algoliaappid),
      backends.updatestrains(fastly, version, config.strains),
      vcl.init(fastly, version),
      vcl.dynamic(fastly, version, dispatchVersion),
      vcl.extensions(fastly, version, vclOverrides),
      vcl.updatestrains(fastly, version, config.strains),
      vcl.queries(fastly, version, indexconfig),
      redirects.updatestrains(fastly, version, config.strains),
      dictionaries.init(
        fastly,
        version,
      )
        .then(() => dictionaries.updatestrains(
          fastly,
          version,
          config.strains,
        )),
    ])
      .then((tasks) => {
        log.info(`completed ${tasks.length} tasks.`);
        return {
          body: {
            status: 'published',
            completed: tasks.length,
          },
          statusCode: 200,
        };
      })
      .catch((e) => {
        log.error(`error executing tasks: ${e}`, e);
        return {
          body: {
            status: 'error',
            message: `${e}`,
            stack: e.stack.split('\n'),
          },
          statusCode: 500,
        };
      });
  } catch (e) {
    // invalid configuration
    log.error(e);
    return {
      body: {
        status: 'invalid configuration',
        message: `${e}`,
        stack: e.stack.split('\n'),
      },
      statusCode: e.statusCode || 400,
    };
  }
}

module.exports = publish;
