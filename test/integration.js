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

/* eslint-disable no-console */
process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

const path = require('path');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const { main } = require('../src/index');

chai.use(chaiHttp);
const { expect } = chai;

/* eslint-env mocha */

const config = {
  configuration: {
    version: 1,
    preflight: 'https://adobeioruntime.net/example',
    strains: {
      adhoc: {
        code: {
          host: 'github.com',
          hostname: 'github.com',
          owner: 'adobe',
          path: '',
          port: '',
          protocol: 'https',
          ref: 'master',
          repo: 'project-helix.io',
        },
        condition: {
          'preflight.x-version>': 1,
        },
        content: {
          host: 'github.com',
          hostname: 'github.com',
          owner: 'adobe',
          path: '',
          port: '',
          protocol: 'https',
          ref: 'master',
          repo: 'project-helix.io',
        },
        directoryIndex: 'index.html',
        name: 'adhoc',
        package: '75f29aa936bfc2b84bde5ac0ee4afbf824b1391e-dirty',
        perf: {
          connection: '',
          device: '',
          location: 'London',
          onload: 1000,
        },
        static: {
          allow: [],
          deny: [],
          host: 'github.com',
          hostname: 'github.com',
          magic: false,
          owner: 'adobe',
          path: '/htdocs',
          port: '',
          protocol: 'https',
          ref: 'master',
          repo: 'project-helix.io',
        },
        sticky: true,
        urls: [],
      },
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
// require('dotenv').config();
const HLX_FASTLY_NAMESPACE = process.env.HLX_FASTLY_NAMESPACE || '54nWWFJicKgbdVHou26Y6a';
const HLX_FASTLY_AUTH = process.env.HLX_FASTLY_AUTH || 'secret';
const VERSION_NUM = process.env.VERSION_NUM || 316;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'A8PL9E4TZT';
const EPSAGON_TOKEN = process.env.EPSAGON_TOKEN || 'fake-token';

if (HLX_FASTLY_NAMESPACE.startsWith('1McG')) {
  console.error('Do not use helix-pages for testing');
  process.exit(2);
}

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
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/mrosier/9d723ce487448cc132cd240a484b65772b201241/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/75f29aa936bfc2b84bde5ac0ee4afbf824b1391e-dirty/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));

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
      this.polly.server.any('https://api.fastly.com/service/54nWWFJicKgbdVHou26Y6a/version/247/vcl/preflight.vcl').intercept((req, res) => {
        res.sendStatus(200);
      });
    }
    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/mrosier/9d723ce487448cc132cd240a484b65772b201241/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));

    this.polly.server
      .get('https://adobeioruntime.net/api/v1/web/75f29aa936bfc2b84bde5ac0ee4afbf824b1391e-dirty/html/_status_check/healthcheck.json')
      .intercept((req, res) => res.json({ status: 'OK', version: '1.2.3' }));

    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: VERSION_NUM,
      ...config,
      indexconfig,
      algoliaappid: ALGOLIA_APP_ID,
      epsagontoken: EPSAGON_TOKEN,
    };

    const res = await main(params);
    assert.deepStrictEqual(res, {
      body: {
        status: 'published',
        completed: 11,
      },
      statusCode: 200,
    });

    console.log('https://api.fastly.com', `/service/${HLX_FASTLY_NAMESPACE}/version/${VERSION_NUM}/validate`);

    await chai
      .request('https://api.fastly.com')
      .get(`/service/${HLX_FASTLY_NAMESPACE}/version/${VERSION_NUM}/validate`)
      .set('Fastly-Key', HLX_FASTLY_AUTH)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response).to.have.status(200);
        /* eslint-disable no-unused-expressions */
        expect(response).to.be.json;
        const json = JSON.parse(response.text);
        expect(json.status).to.equal('ok');
        expect(json.errors).to.be.an('array');
        expect(json.errors, `errors: ${JSON.stringify(json.errors)}`).to.be.empty;
        expect(json.messages).to.be.an('array');
        expect(json.warnings).to.be.an('array');
        /* eslint-enable no-unused-expressions */
      });
  }).timeout(60000);

  it('Test publish function with invalid configuration', async () => {
    const params = {
      service: HLX_FASTLY_NAMESPACE,
      token: HLX_FASTLY_AUTH,
      version: VERSION_NUM - 1,
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

    const res = await main({ __ow_method: 'get', __ow_path: '/_status_check/healthcheck.json' });

    assert.equal(res.statusCode, 200);
  });
});
