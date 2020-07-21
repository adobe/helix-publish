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

const { HelixConfig } = require('@adobe/helix-shared');
const assert = require('assert');
const path = require('path');
const checkPkgs = require('../src/check-pkgs');

describe('test check_pkgs', () => {
  it('checkPkgs works successfully', async () => {
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/pass.yaml'))
      .init();
    await checkPkgs(config);
  });

  it('checkPkgs fails if one check fails', async () => {
    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/fail.yaml'))
      .init();
    try {
      await checkPkgs(config);
      assert.fail('test should have failed');
    } catch (e) {
      assert.ok('checkPkg failed properly');
    }
  });
});
