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
const { include } = require('../src/fastly/include-util');
const Parser = require('../src/vcl/parser');

describe('Lint helix.vcl', () => {
  const vars = {};

  const tracer = (txt) => new Parser(txt)
    .parse()
    .on('set', {
      before: (e) => {
        const [obj] = e.name.split('.');
        vars[obj] = vars[obj] ? vars[obj] : new Set();
        vars[obj].add(e.name);
        return '';
      },
    })
    .transform();

  include(path.resolve(__dirname, '../layouts/fastly/helix.vcl'), tracer);
  include(path.resolve(__dirname, 'fixtures/full-params.vcl'), tracer);
  include(path.resolve(__dirname, 'fixtures/full-resolve.vcl'), tracer);

  it('Request header count is below limit', () => {
    const headers = Array.from(vars.req).filter((name) => name.startsWith('req.http'));
    assert.ok(headers.length < 85, 'likely header overflow');
    console.log(`found ${headers.length} request headers`);
  });

  it('BE Request header count is below limit', () => {
    const headers = Array.from(vars.bereq).filter((name) => name.startsWith('bereq.http'));
    assert.ok(headers.length < 85, 'likely header overflow');
    console.log(`found ${headers.length} be request headers`);
  });

  it('Response header count is below limit', () => {
    const headers = Array.from(vars.resp).filter((name) => name.startsWith('resp.http'));
    assert.ok(headers.length < 85, 'likely header overflow');
    console.log(`found ${headers.length} response headers`);
  });

  it('BE Response header count is below limit', () => {
    const headers = Array.from(vars.beresp).filter((name) => name.startsWith('beresp.http'));
    assert.ok(headers.length < 85, 'likely header overflow');
    console.log(`found ${headers.length} be response headers`);
  });
});
