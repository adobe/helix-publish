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
const openwhisk = require('openwhisk');

/**
 * This creates specific errors to deal with
 * when this check fails.
 */
class WhiskError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WhiskError';
  }
}

/* class PackageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PackageNotFoundError';
  }
}
*/

/**
 * This function gets list of packages deployed to OpenWhisk
 *
 * @param auth {string} openwhisk authentication key
 * @param host {string} openwhisk api host
 * @param namespace {string} openwhisk namespace under which actions exist
 */
async function getPackageList(auth, host, namespace, log) {
  const ow = openwhisk({
    api_key: auth,
    apihost: host,
    namespace,
  });

  try {
    const packageList = await ow.packages.list();
    return packageList.reduce((prev, curr) => {
      // eslint-disable-next-line no-param-reassign
      prev[curr.name] = true;
      return prev;
    }, {});
  } catch (e) {
    log.error(e);
    throw new WhiskError('whisk failed to obtain package list');
  }
}

/**
 * This function checks that packages defined for
 * strains in a given Helix Configuration are deployed
 *
 * @param auth {string} openwhisk authentication key
 * @param host {string} openwhisk api host
 * @param namespace {string} openwhisk namespace under which actions exist
 * @param config {object} a Helix Configuration object
 */
async function checkPkgs(auth, host, namespace, config, log = console) {
  const packages = await getPackageList(auth, host, namespace, log);

  config.strains.forEach((strain) => {
    if (strain.package && !(strain.package in packages)) {
      log.error(`action package for the following strain: << ${strain.name} >> not deployed`);
    }
  });
}

module.exports = {
  checkPkgs,
  WhiskError,
};
