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
const { main } = require('../src/index');

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
        package: 'mrosier/9d723ce487448cc132cd240a484b65772b201241',
        sticky: false,
        condition: {
          url: 'https://www.project-helix.io/cli',
        },
        perf: { device: '', location: '', connection: '' },
        urls: ['https://www.project-helix.io/cli'],
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
/* eslint-disable no-template-curly-in-string */
const indexconfig = {
  indices: {
    'blog-posts': {
      fetch: 'https://${repo}-${owner}.project-helix.page/${path}',
      properties: {
        author: {
          faceted: true,
          select: 'main > div:nth-of-type(3) > p:nth-of-type(1)',
          value: "${match('by (.*)')}\n",
        },
        date: {
          select: 'main > div:nth-of-type(3) > p:nth-of-type(2)',
          value: "${parseTimestamp('[POSTED ON] MM-DD-YYYY')}\n",
        },
        hero: {
          select: 'main > div > img:first-of-type',
          value: "${attribute('src')}\n",
        },
        title: {
          select: 'h1:first-of-type',
          value: '${textContent()}\n',
        },
        topics: {
          faceted: true,
          select: 'main > div:last-of-type > p:first-of-type',
          values: "${match('(Topics: )? ([^,]+)')}\n",
        },
      },
      queries: {
        all: {
          cache: 600,
          hitsPerPage: 25,
          query: '*',
          parameters: [],
          select: '*',
        },
        'by-author': {
          cache: 300,
          filters: 'author:${author}\n',
          hitsPerPage: 25,
          parameters: [
            'author',
          ],
          query: '*',
          select: '*',
        },
      },
      source: 'html',
    },
  },
  version: 1,
};
/* eslint-enable no-template-curly-in-string */

// give process.env values preference, so that we can test this on circleci w/o polly
const usePolly = !process.env.HLX_FASTLY_NAMESPACE;
const HLX_FASTLY_NAMESPACE = process.env.HLX_FASTLY_NAMESPACE || '54nWWFJicKgbdVHou26Y6a';
const HLX_FASTLY_AUTH = process.env.HLX_FASTLY_AUTH || 'secret';
const VERSION_NUM = process.env.VERSION_NUM || 247;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'A8PL9E4TZT';

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
        exclude: ['content-length', 'user-agent', 'authorization', 'fastly-key'],
      },
      url: {
        protocol: true,
        username: false,
        password: false,
        hostname: true,
        port: false,
        pathname: true,
        query: false,
        hash: false,
      },
    },
  });

  beforeEach(async function beforeEach() {
    if (usePolly) {
      this.polly.server.any().on('beforeResponse', (req) => {
        // don't record the authorization header
        req.removeHeaders(['Fastly-Key']);
        req.removeHeaders(['authorization']);
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

  it('Test publish function locally', async function test() {
    if (usePolly) {
      this.polly.server.any('https://api.fastly.com/service/54nWWFJicKgbdVHou26Y6a/version/247/backend/AdobeFonts').intercept((req, res) => {
        res.sendStatus(200);
      });
    }

    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: VERSION_NUM,
      ...config,
      indexconfig,
      algoliaappid: ALGOLIA_APP_ID,
    };

    const res = await main(params);
    assert.deepStrictEqual(res, {
      body: {
        status: 'published',
        completed: 9,
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
});
