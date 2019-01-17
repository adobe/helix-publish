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
const sinon = require('sinon');
const path = require('path');
const { HelixConfig } = require('@adobe/helix-shared');
const { init, updatestrains } = require('../src/fastly/vcl');

/* eslint-env mocha */

describe('Testing vcl.js', () => {
  it('#init', async () => {
    const fastly = {
      writeVCL: sinon.fake.returns({}),
      setMainVCL: sinon.fake.returns({}),
    };

    assert.ok(await init(fastly, 1));
    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(1, 'helix.vcl'));
    assert.ok(fastly.setMainVCL.calledOnce);
  });

  it('#updatestrains/full', async () => {
    const fastly = {
      writeVCL: sinon.fake(),
    };

    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();

    assert.ok(await updatestrains(fastly, 1, config.strains));

    assert.ok(fastly.writeVCL.calledThrice);
    assert.ok(fastly.writeVCL.calledWith(1, 'strains.vcl'));
    assert.ok(fastly.writeVCL.calledWith(1, 'params.vcl'));
    assert.ok(fastly.writeVCL.calledWith(1, 'dynamic.vcl'));
  });
});
