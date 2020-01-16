/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { IndexConfig } = require('@adobe/helix-shared');
const { queryvcl, encode } = require('../src/fastly/algolia');

/* eslint-env mocha */

describe('Test Query VCL generation', () => {
  it('Generates empty VCL for empty config', async () => {
    const indexconfig = await new IndexConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/no-queries.yaml'))
      .init();

    assert.equal(queryvcl(indexconfig.indices), '');
  });

  it('Generates valid VCL for valid config', async () => {
    const indexconfig = await new IndexConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/example-queries.yaml'))
      .init();

    const vcl = fs.readFileSync(path.resolve(__dirname, 'fixtures/example-queries.vcl')).toString();

    assert.equal(queryvcl(indexconfig.indices), vcl);
  });
});

describe('Test expression parser', () => {
  it('Parses expressions', () => {
    assert.equal(encode('author:${author}', ['author']), `"author%3A" + regsub(querystring.filter_except(req.url, "author"), "^.*=", "") + ""`);
    assert.equal(encode('author:${foobar}', ['foobar']), `"author%3A" + regsub(querystring.filter_except(req.url, "foobar"), "^.*=", "") + ""`);
    assert.equal(encode('author:${foobar}', ['author']), `"author%3A%24%7Bfoobar%7D"`);
  });
});
