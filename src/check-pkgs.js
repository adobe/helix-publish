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
/* eslint-disable max-classes-per-file */
const { fetch } = require('@adobe/helix-fetch');

/**
 * This function takes strains and sends requests
 * to ensure the corresponding action is deployed.
 * @param {object} strains array of strains from HelixConfig
 * @param {object} log logger
 */
async function getPromises(strains, log) {
  const checks = strains.reduce((acc, curr) => {
    if (curr.package) {
      acc.push(fetch(`https://adobeioruntime.net/api/v1/web/${curr.package}/hlx--static/_status_check/healthcheck.json`)
        .then(async (result) => {
          if (!result.ok) {
            log.error(`fetch call failed for url ${result.url}`);
            throw new Error(await result.text());
          } else {
            return result.json();
          }
        }));
    }
    return acc;
  }, []);

  return checks;
}

/**
 * This function checks that packages defined for
 * strains in a given Helix Configuration are deployed
 *
 * @param {object} config a Helix Configuration object
 * @param {object} log logger
 */
async function checkPkgs(config, log = console) {
  const strains = config.strains.getRuntimeStrains();
  return Promise.all(await getPromises(strains, log));
}

module.exports = checkPkgs;
