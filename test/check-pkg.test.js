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

const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const { HelixConfig } = require('@adobe/helix-shared');
const assert = require('assert');
const path = require('path');
const check_pkgs = require('../src/check-pkgs');

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
          url: {
              hostname: true,
              pathname: true,
              protocol: false,
              username: false,
              port: false,
              query: false,
              hash: false,
          }
        },
    });

    it('check_pkgs works successfully', async function test(){
        const host = 'fake_host1';
        const auth = 'fake_auth1';    
        const namespace = 'fake_ns1';
        const config = await new HelixConfig()
        .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
        .init();
        await check_pkgs(auth, host, namespace, config);
    });

    it('check_pkgs fails if package list missing action', async function test(){
        const host = 'fake_host2';
        const auth = 'fake_auth2';    
        const namespace = 'fake_ns2';
        const config = await new HelixConfig()
        .withConfigPath(path.resolve(__dirname, 'fixtures/demo.yaml'))
        .init();

        const fn = () => check_pkgs(auth, host, namespace, config);

        await assert.rejects(fn, new Error('config package for the strain: default not deployed'));
    });

    it('check_pkgs fails if openwhisk fails', async function test(){
        const host = 'fake_host3';
        const auth = 'fake_auth3';    
        const namespace = 'fake_ns3';
        const config = await new HelixConfig()
        .withConfigPath(path.resolve(__dirname, 'fixtures/demo.yaml'))
        .init();

        const fn = async () => await check_pkgs(auth, host, namespace, config);

        await assert.rejects(fn, new Error('Openwhisk error: please double check your credentials'));
    });
});