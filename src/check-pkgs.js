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
const { fetch } = require('@adobe/helix-fetch').context({
  httpsProtocols:
  /* istanbul ignore next */
    process.env.HELIX_FETCH_FORCE_HTTP1 ? ['http1'] : ['http2', 'http1'],
});

/**
 * This function takes strains and sends requests
 * to ensure the corresponding action is deployed.
 * @param {object} strain strain from HelixConfig
 * @param {object} log logger
 */
async function checkStrains(strain, log = console) {
  // for now we assume that all helix projects have a html action...
  const result = await fetch(
    !strain.package.match(/^https:/)
      ? `https://adobeioruntime.net/api/v1/web/${strain.package}/html/_status_check/healthcheck.json`
      : `${strain.package}/html/_status_check/healthcheck.json`,
  );
  if (!result.ok) {
    log.error(`fetch call failed for url ${result.url}`);
    throw new Error(await result.text());
  } else {
    return result.json();
  }
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
  const checkArr = strains
    .filter((strain) => !!strain.package)
    .map((strain) => checkStrains(strain, log));
  return Promise.all(checkArr);
}

module.exports = checkPkgs;
