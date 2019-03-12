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
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { main } = require('../index');
/* eslint-env mocha */

describe('Troubleshooting Tests', () => {
  fs.readdirSync(path.resolve(__dirname, 'troubleshoot'))
    .filter(file => file.match(/\.json$/))
    .forEach((file) => {
      it(`Troubleshooting ${file}`, async () => {
        const config = fs.readJSONSync(path.resolve(__dirname, 'troubleshoot', file));
        const res = await main(config);
        assert.deepStrictEqual(res, {
          body: {
            status: 'published',
            completed: 6,
          },
          statusCode: 200,
        });
      });
    });
});
