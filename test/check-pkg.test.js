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

const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const { HelixConfig } = require('@adobe/helix-shared');
const assert = require('assert');
const path = require('path');
const { checkPkgs, WhiskError } = require('../src/check-pkgs');

describe('test check_pkgs', () => {
  setupPolly({
    recordFailedRequests: true,
    recordIfMissing: false,
    logging: false,
    adapters: [NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, 'fixtures/recordings'),
      },
    },
    matchRequestsBy: {
      body: false,
      order: false,
      headers: {
        exclude: ['authorization'],
      },
      url: {
        hostname: true,
        pathname: true,
        protocol: false,
        username: false,
        port: false,
        query: false,
        hash: false,
      },
    },
  });

  beforeEach(async function test() {
    this.polly.server.any().on('beforeResponse', (req) => {
      delete req.removeHeaders(['authorization']);
    });
  });

  it('checkPkgs works successfully', async () => {
    const host = 'adobeioruntime.net';
    const auth = 'fake';
    const namespace = 'mrosier';
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();
    await checkPkgs(auth, host, namespace, config);
  });

  it('checkPkgs fails if package list missing action', async () => {
    const host = 'adobeioruntime.net';
    const auth = 'fake';
    const namespace = 'mrosier';
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/demo.yaml'))
      .init();

    await checkPkgs(auth, host, namespace, config);
    // await assert.rejects(fn, new PackageNotFoundError('action
    // package for the following strain: << default >> not deployed'));
  });

  it('checkPkgs fails if openwhisk fails', async () => {
    const host = 'adobeioruntime.net';
    const auth = 'error';
    const namespace = 'mrosier';
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/demo.yaml'))
      .init();

    const fn = async () => checkPkgs(auth, host, namespace, config);
    await assert.rejects(fn, new WhiskError('whisk failed to obtain package list'));
  });
});
