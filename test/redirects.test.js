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
process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const { HelixConfig } = require('@adobe/helix-shared');
const { updatestrains } = require('../src/fastly/redirects');

/* eslint-env mocha */

describe('Testing redirects.js', () => {
  it('#updatestrains/full', async () => {
    const fakeupdate = sinon.fake();

    const fastly = {
      headers: {
        update: () => fakeupdate,
      },
    };

    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();

    await updatestrains(fastly, 1, config.strains);

    assert.ok(fakeupdate.calledOnce);
    assert.deepStrictEqual(fakeupdate.lastCall.args, [{
      condition: 'req.http.X-Strain == "default" && req.url.path ~ "\\/foo\\/(.*)"',
      expression: '"/bar/" + re.group.1 + ""',
    },
    {
      condition: 'req.http.X-Strain == "adhoc" && req.url.path ~ "\\/foo\\/(.*)"',
      expression: '"/bar/" + re.group.1 + ""',
    },
    {
      condition: 'req.http.X-Strain == "client" && req.url.path ~ "\\/(.*).php"',
      expression: '"/" + re.group.1 + ".html"',
    },
    {
      condition: 'req.http.X-Strain == "pipeline" && req.url.path ~ "\\/foo\\/(.*)"',
      expression: '"/bar/" + re.group.1 + ""',
    }]);
  });
});
