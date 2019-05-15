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
/* eslint-env mocha */
const fs = require('fs-extra');
const assert = require('assert');
const path = require('path');
const { include, synthetize } = require('../src/fastly/include-util');

describe('Testing include-util.js', () => {
  ['simple'].forEach((f) => {
    it('#include', () => {
      const res = include(path.resolve(__dirname, `fixtures/include-${f}.vcl`));
      const expect = fs.readFileSync(path.resolve(__dirname, `fixtures/include-${f}-resolved.vcl`)).toString();
      assert.equal(res, expect);
    });

    it('#synthetize', () => {
      const res = synthetize('some content', '');
      assert.equal(res, 'some content');
    });

    it('#synthetize', () => {
      const res = synthetize('some content with an include\nsynthetic {"include:include.html"};\n', path.resolve(__dirname, 'fixtures'));
      assert.equal(res, 'some content with an include\nsynthetic {"<html lang="en_US">\n  Haha!\n</html>"};\n');
    });
  });
});
