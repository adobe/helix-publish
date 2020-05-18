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
const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');
const Parser = require('../src/vcl/parser');

const helix = fs.readFileSync(path.resolve(__dirname, '../layouts/fastly/helix.vcl')).toString();

describe('Test VCL Parser', () => {
  it('Parses empty file', () => {
    const p = new Parser('');
    assert.deepEqual(p.parse().typed, [{
      line: '',
      type: 'whitespace',
    }]);
  });

  it('Parses helix.vcl', () => {
    const transformed = new Parser(helix)
      .parse()
      .on('comment', { before: () => '# here comes a comment' })
      .on('subend', { after: () => '# that is all' })
      .transform();

    assert.ok(transformed.endsWith(`sub vcl_log {
# here comes a comment
#FASTLY log
}
# that is all
`));
  });
});
