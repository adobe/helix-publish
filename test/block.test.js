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

const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');

const re = new RegExp(fs.readFileSync(path.resolve(__dirname, '../layouts/fastly/helix.vcl')).toString().match(/"(.*)".* # block baddies/)[1].replace(/%25/g, '%'));
console.log(re);

describe('Test blocked paths', () => {
  const bads = fs.readFileSync(path.resolve(__dirname, 'fixtures/blocked-paths.txt')).toString().split('\n');
  bads.forEach((bad) => it(`deny ${bad}`, () => assert.ok(re.test(bad))));
});

describe('Test allowed paths', () => {
  const goods = fs.readFileSync(path.resolve(__dirname, 'fixtures/allowed-paths.txt')).toString().split('\n');
  goods.forEach((good) => it(`allow ${good}`, () => assert.ok(!re.test(good))));
});
