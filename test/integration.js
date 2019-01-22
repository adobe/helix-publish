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
      },
    },
  },
};

describe('Integration Test', () => {
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
    console.log(res);
  }).timeout(60000);
});
