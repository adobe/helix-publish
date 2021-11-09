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
const { toString, vcl, str } = require('../src/vcl/schemahelper');

describe('Test Schema Helper', () => {
  it('Test simple formatting', () => {
    assert.equal(
      toString({}),
      '{json"{ }"json}',
    );
  });

  it('Test key value formatting', () => {
    assert.equal(
      toString({ foo: str`bar` }),
      '{json"{ "foo": "bar" }"json}',
    );
  });

  it('Test nested object formatting', () => {
    assert.equal(
      toString({ foo: { bar: { baz: str`qxb` } } }),
      '{json"{ "foo": { "bar": { "baz": "qxb" } } }"json}',
    );
  });

  it('Test simple VCL formatting', () => {
    assert.equal(
      toString({
        epsagon_token: str`fake`,
        enter: str`hlx_strain`,
        'req.http.X-CDN-Request-ID': vcl`req.http.X-CDN-Request-ID`,
      }),
      '{json"{ "epsagon_token": "fake",  "enter": "hlx_strain",  "req.http.X-CDN-Request-ID": ""json} req.http.X-CDN-Request-ID {json"" }"json}',
    );
  });
});
