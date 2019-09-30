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
const path = require('path');
const assert = require('assert');
const request = require('request-promise-native');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const bunyan = require('bunyan');
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

// give process.env values preference, so that we can test this on circleci w/o polly
const usePolly = !process.env.HLX_FASTLY_NAMESPACE;
const HLX_FASTLY_NAMESPACE = process.env.HLX_FASTLY_NAMESPACE || '54nWWFJicKgbdVHou26Y6a';
const HLX_FASTLY_AUTH = process.env.HLX_FASTLY_AUTH || 'secret';
const VERSION_NUM = process.env.VERSION_NUM || 247;

describe('Integration Test', () => {
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
        exclude: ['content-length', 'user-agent', 'fastly-key'],
      },
    },
  });

  beforeEach(async function beforeEach() {
    if (usePolly) {
      this.polly.server.any().on('beforeResponse', (req) => {
        // don't record the authorization header
        req.removeHeaders(['Fastly-Key']);
        delete req.body;
      });
    } else {
      this.polly.server.any().passthrough();
    }
  });

  it('Test publish function with invalid credentials', async () => {
    const params = { version: 2, ...config };

    const res = await main(params);
    assert.equal(res.statusCode, 401);
  }).timeout(60000);

  it('Test publish function with invalid version', async function test() {
    if (usePolly) {
      this.polly.server.any('https://api.fastly.com/*').intercept((req, res) => {
        res.sendStatus(500);
      });
    }
    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: -10,
      ...config,
    };

    const res = await main(params);
    assert.equal(res.statusCode, 500);
  }).timeout(60000);

  it('Test publish function locally', async () => {
    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: VERSION_NUM,
      ...config,
    };

    const res = await main(params);
    assert.deepStrictEqual(res, {
      body: {
        status: 'published',
        completed: 8,
      },
      statusCode: 200,
    });

    const valid = await request.get(
      `https://api.fastly.com/service/${HLX_FASTLY_NAMESPACE}/version/${VERSION_NUM}/validate`,
      {
        headers: {
          'Fastly-Key': HLX_FASTLY_AUTH,
          accept: 'application/json',
        },
        json: true,
      },
    );
    assert.deepStrictEqual(valid, {
      status: 'ok', errors: [], messages: [], warnings: [], msg: null,
    });
  }).timeout(60000);

  it('Test publish function with invalid configuration', async () => {
    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: VERSION_NUM,
    };

    const res = await main(params);
    assert.equal(res.statusCode, 400);
  }).timeout(60000);

  it('Get valid status report', async function test() {
    if (usePolly) {
      this.polly.server.get('https://api.fastly.com/').intercept((req, res) => {
        res.sendStatus(200);
      });
    }

    const res = await main({ __ow_method: 'get', __ow_path: '/_status_check/pingdom.xml' });

    assert.equal(res.statusCode, 200);
    assert.ok(res.body.match(/<status>OK<\/status>/));
  });

  it('index function instruments epsagon', async function test() {
    this.polly.server.any('*').intercept((req, res) => {
      res.sendStatus(200);
    });
    const logger = bunyan.createLogger({
      name: 'test-logger',
      streams: [{
        level: 'info',
        type: 'raw',
        stream: new bunyan.RingBuffer({ limit: 100 }),
      }],
    });
    await main({
      EPSAGON_TOKEN: 'foobar',
      __ow_logger: logger,
    });

    assert.strictEqual(logger.streams[0].stream.records[0].msg, 'instrumenting epsagon.');
  });
});
