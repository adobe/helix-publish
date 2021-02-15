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
const querystring = require('querystring');
const fetchAPI = require('@adobe/helix-fetch');

const { fetch } = process.env.HELIX_FETCH_FORCE_HTTP1
  ? fetchAPI.context({
    alpnProtocols: [fetchAPI.ALPN_HTTP1_1],
    userAgent: 'helix-fetch', // static user agent for test recordings
  })
  /* istanbul ignore next */
  : fetchAPI;

/**
 * This function takes strains and sends requests
 * to ensure the corresponding action is deployed.
 * @param {object} strain strain from HelixConfig
 * @param {object} log logger
 */
async function checkStrains(strain, log = console) {
  // for now we assume that all helix projects have a html action...
  const testUrl = strain.package.startsWith('https://')
    ? `${strain.package}/html/_status_check/healthcheck.json`
    : `https://adobeioruntime.net/api/v1/web/${strain.package}/html/_status_check/healthcheck.json`;
  const result = await fetch(testUrl, {
    headers: {
      'X-OW-Version-Lock': querystring.stringify(strain.versionLock || {}),
    },
  });
  const body = await result.text();
  if (!result.ok) {
    const msg = `Status check for strain ${strain.name} failed when invoking ${testUrl}: ${result.status} ${body}`;
    log.error(msg);
    throw new Error(msg);
  } else {
    return JSON.parse(body);
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
