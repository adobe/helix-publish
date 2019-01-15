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

const backends = {
  GitHub: {
    hostname: 'raw.githubusercontent.com',
    error_threshold: 0,
    first_byte_timeout: 15000,
    weight: 100,
    address: 'raw.githubusercontent.com',
    connect_timeout: 1000,
    name: 'GitHub',
    port: 443,
    between_bytes_timeout: 10000,
    shield: 'iad-va-us',
    ssl_cert_hostname: 'githubusercontent.com',
    max_conn: 200,
    use_ssl: true,
  },
  AdobeRuntime: {
    hostname: 'adobeioruntime.net',
    error_threshold: 0,
    first_byte_timeout: 60000,
    weight: 100,
    address: 'adobeioruntime.net',
    connect_timeout: 1000,
    name: 'AdobeRuntime',
    port: 443,
    between_bytes_timeout: 10000,
    shield: 'iad-va-us',
    ssl_cert_hostname: 'adobeioruntime.net',
    max_conn: 200,
    use_ssl: true,
  },
};
async function init(fastly, version) {
  // go over all defined backends and create a new one
  return Promise.all(Object.values(backends).map(backend => fastly.writeBackend(
    version,
    backend.name,
    backend,
  )));
}

async function updatestrains(fastly, version, strains) {
  // filter out all proxy strains
  const proxystrains = strains.getProxyStrains();
  // create a new backend or update and existing one for each origin defined
  return Promise.all(
    proxystrains
      .map(proxystrain => proxystrain.origin)
      .map(origin => fastly.writeBackend(version, origin.name, origin.toJSON())),
  );
}

module.exports = {
  init, updatestrains,
};
