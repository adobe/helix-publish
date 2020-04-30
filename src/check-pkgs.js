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
const fetch = require('@adobe/helix-fetch');

/**
 * This function checks that packages defined for
 * strains in a given Helix Configuration are deployed
 *
 * @param config {object} a Helix Configuration object
 */
async function checkPkgs(config) {
  const checks = config.strains.getRuntimeStrains().reduce((acc, curr) => {
    if (curr.package) {
      acc.push(new Promise((resolve, reject) => {
        fetch.fetch(`https://adobeioruntime.net/api/v1/web/${curr.package}/hlx--static/_status_check/healthcheck.json`)
          .then((res) => {
            if (!res.ok) {
              reject(new Error(`the following health check failed: ${res.url}`));
            }
            resolve();
          });
      }));
    }
    return acc;
  }, []);

  return Promise.all(checks);
}

module.exports = checkPkgs;
