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
const allowRgx = require('../src/rgx/allow.js');

function decode(urlfragment) {
  try {
    return `(${decodeURIComponent(urlfragment)})`;
  } catch {
    return '';
  }
}

describe('Test blocked paths', () => {
  const bads = fs.readFileSync(path.resolve(__dirname, 'fixtures/blocked-paths.txt'), 'utf-8')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => !!s);
  bads.forEach((bad) => it(`deny ${bad} ${decode(bad)}`, () => {
    const allowed = allowRgx.filter((re) => re.test(bad));
    assert.equal(allowed.length, 0);
  }));
});

describe('Test allowed paths', () => {
  const goods = fs.readFileSync(path.resolve(__dirname, 'fixtures/allowed-paths.txt'), 'utf-8')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => !!s);
  goods.forEach((good) => it(`allow ${good}`, () => {
    const allowed = allowRgx.filter((re) => re.test(good));
    assert.notEqual(allowed.length, 0);
  }));
});
