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
const { condit } = require('@adobe/helix-testutils');
const assert = require('assert');
const request = require('request-promise-native');
const { main } = require('../index');
/* eslint-env mocha */

const config = {
  configuration: {
    version: 1,
    strains: {
      default: {
        code: {
          protocol: 'ssh',
          host: 'github.com',
          port: '',
          hostname: 'github.com',
          owner: 'adobe',
          repo: 'helix-cli',
          ref: '',
          path: '',
        },
        content: {
          protocol: 'ssh',
          host: 'github.com',
          port: '',
          hostname: 'github.com',
          owner: 'adobe',
          repo: 'helix-cli',
          ref: '',
          path: '',
        },
        static: {
          magic: false,
          allow: [],
          deny: [],
          protocol: 'ssh',
          host: 'github.com',
          port: '',
          hostname: 'github.com',
          owner: 'adobe',
          repo: 'helix-cli',
          ref: '',
          path: '/htdocs',
        },
        directoryIndex: 'index.html',
        package: 'dirty',
        sticky: false,
        condition: '',
        perf: { device: '', location: '', connection: '' },
        urls: ['https://www.project-helix.io/cli'],
        url: 'https://www.project-helix.io/cli',
        redirects: [
          {
            from: '(.*)\\.php',
            to: '$1.html',
          },
        ],
      },
    },
  },
};

describe('Integration Test', () => {
  it('Test publish function with invalid credentials', async () => {
    const params = Object.assign({
      version: 2,
    }, config);

    const res = await main(params);
    assert.equal(res.statusCode, 401);
  }).timeout(60000);

  condit('Test publish function with invalid version', condit.hasenvs([
    'HLX_FASTLY_NAMESPACE',
    'HLX_FASTLY_AUTH']), async () => {
    const params = Object.assign({
      service: process.env.HLX_FASTLY_NAMESPACE,
      token: process.env.HLX_FASTLY_AUTH,
      version: -10,
    }, config);

    const res = await main(params);
    assert.equal(res.statusCode, 500);
  }).timeout(60000);

  condit('Test publish function locally', condit.hasenvs([
    'HLX_FASTLY_NAMESPACE',
    'HLX_FASTLY_AUTH',
    'VERSION_NUM']), async () => {
    const params = Object.assign({
      service: process.env.HLX_FASTLY_NAMESPACE,
      token: process.env.HLX_FASTLY_AUTH,
      version: process.env.VERSION_NUM,
    }, config);

    const res = await main(params);
    assert.deepStrictEqual(res, {
      body: {
        status: 'published',
        completed: 7,
      },
      statusCode: 200,
    });

    const valid = await request.get(
      `https://api.fastly.com/service/${process.env.HLX_FASTLY_NAMESPACE}/version/${process.env.VERSION_NUM}/validate`,
      {
        headers: {
          'Fastly-Key': process.env.HLX_FASTLY_AUTH,
          accept: 'application/json',
        },
        json: true,
      },
    );
    assert.deepStrictEqual(valid, {
      status: 'ok', errors: [], messages: [], warnings: [], msg: null,
    });
  }).timeout(60000);

  condit('Test publish function with invalid configuration', condit.hasenvs([
    'HLX_FASTLY_NAMESPACE',
    'HLX_FASTLY_AUTH',
    'VERSION_NUM']), async () => {
    const params = Object.assign({
      service: process.env.HLX_FASTLY_NAMESPACE,
      token: process.env.HLX_FASTLY_AUTH,
      version: process.env.VERSION_NUM,
    }, {});

    const res = await main(params);
    assert.equal(res.statusCode, 400);
  }).timeout(60000);

  it('Get valid status report', async () => {
    const res = await main({ __ow_method: 'get' });

    assert.equal(res.statusCode, 200);
    assert.ok(res.body.match(/<status>OK<\/status>/));
  });
});
