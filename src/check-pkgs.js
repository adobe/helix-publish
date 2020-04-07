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

const openwhisk = require('openwhisk');
/**
 * @param auth {string} openwhisk authentication key
 * @param host {string} openwhisk api host
 * @param namespace {string} openwhisk namespace under which actions exist
 */
function check_pkgs(auth, host, namespace, config) {
  return new Promise((resolve, reject) => {
    const ow = openwhisk({
      api_key: auth,
      apihost: host,
      namespace,
    });
    ow.packages.list().then((data) => {
      const package_list = data.reduce((prev, curr) => {
        prev[curr.name] = true;
        return prev;
      }, {});

      config.strains.forEach((strain) => {
        if (strain.package && !(strain.package in package_list)) {
          return reject(Error(`config package for the strain: ${strain.name} not deployed`));
        }
      });
      return resolve(true);
    })
      .catch((e) => reject(Error('Openwhisk error: please double check your credentials')));
  });
}

module.exports = check_pkgs;
