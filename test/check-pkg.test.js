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

/* eslint-env mocha */
process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

const assert = require('assert');
const path = require('path');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const FSPersister = require('@pollyjs/persister-fs');
const { HelixConfig } = require('@adobe/helix-shared');
const checkPkgs = require('../src/check-pkgs');

describe('test check_pkgs', () => {
  setupPolly({
    recordIfMissing: false,
    adapters: [NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, 'fixtures/recordings'),
      },
    },
  });

  it('checkPkgs works successfully', async function test() {
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/mrosier/d90a42b1babf33d430450e05cbd3dc1edc6b7135/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/mrosier/c4763cd3420bf015454e2e1f2ce2ecd1dd1ca942/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/mrosier/9d723ce487448cc132cd240a484b65772b201241/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/pass.yaml'))
      .init();
    await checkPkgs(config);
  });

  it('checkPkgs fails if one check fails', async function test() {
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/fake/d90a42b1babf33d430450e05cbd3dc1edc6b7135dafa/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/fake/c4763cd3420bf015454e2e1f2ce2ecd1dd1ca942/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/fake/9d723ce487448cc132cd240a484b65772b201241/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.sendStatus(404));
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/fail.yaml'))
      .init();

    await assert.rejects(async () => checkPkgs(config));
  });
});
