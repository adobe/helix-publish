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
const fs = require('fs-extra');
const blockRgx = require('../src/rgx/block.js');

const globalhits = {};

describe('Test blocked paths', () => {
  const bads = fs.readFileSync(path.resolve(__dirname, 'fixtures/blocked-paths.txt')).toString().split('\n');
  bads.forEach((bad) => it(`deny ${bad}`, () => {
    const hits = blockRgx.filter((re) => {
      const hit = !!re.test(bad);
      if (hit) {
        globalhits[re] = globalhits[re] ? globalhits[re] + 1 : 1;
        return true;
      }
      return false;
    });
    assert.ok(hits.length);
  }));
});

describe('Test allowed paths', () => {
  const goods = fs.readFileSync(path.resolve(__dirname, 'fixtures/allowed-paths.txt')).toString().split('\n');
  goods.forEach((good) => it(`allow ${good}`, () => {
    const hits = blockRgx.filter((re) => !!re.test(good));
    assert.equal(hits.length, 0, `${hits.length} false match for ${hits}`);
  }));
});

describe('No useless expressions', () => {
  blockRgx.forEach((re) => it(`${re} is useful`, () => assert.ok(globalhits[re])));
});
