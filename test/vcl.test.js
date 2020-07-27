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
const { HelixConfig, IndexConfig } = require('@adobe/helix-shared');
const {
  init, finish, updatestrains, extensions, dynamic, queries,
} = require('../src/fastly/vcl');

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
    assert.ok(fastly.setMainVCL.notCalled);
  });

  it('#finish', async () => {
    const fastly = {
      setMainVCL: sinon.fake.returns({}),
    };

    assert.ok(await finish(fastly, 1));
    assert.ok(fastly.setMainVCL.calledOnce);
    assert.ok(fastly.setMainVCL.calledWith(1, 'helix.vcl'));
  });

  it('#extensions', async () => {
    const fastly = {
      writeVCL: sinon.fake.returns({}),
    };

    assert.ok(await extensions(fastly, 1));
    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(1, 'extensions.vcl'));
  });

  it('#extensions - valid override', async () => {
    const fastly = {
      writeVCL: sinon.fake.returns({}),
    };

    assert.ok(await extensions(fastly, 1, { extensions: 'custom extension' }));
    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(1, 'extensions.vcl', sinon.match({
      content: 'custom extension',
      name: 'extensions.vcl',
    })));
  });

  it('#extensions - unknown override', async () => {
    const fastly = {
      writeVCL: sinon.fake.returns({}),
    };

    assert.ok(await extensions(fastly, 1, { unknown: 'custom extension' }));
    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(
      1,
      'extensions.vcl',
      sinon.match((arg) => arg.content !== 'custom extension' && arg.name === 'extensions.vcl'),
    ));
  });

  it('#updatestrains/full', async () => {
    const fastly = {
      writeVCL: sinon.fake(),
    };

    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();

    assert.ok(await updatestrains(fastly, 1, config.strains));

    assert.ok(fastly.writeVCL.calledTwice);
    assert.ok(fastly.writeVCL.calledWith(1, 'strains.vcl'));
    assert.ok(fastly.writeVCL.calledWith(1, 'params.vcl'));
  });

  it('#dynamic', async () => {
    const fastly = {
      writeVCL: sinon.fake(),
    };

    assert.ok(await dynamic(fastly, 1, 1));

    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(1, 'dynamic.vcl'));
  });

  it('#queries/example', async () => {
    const fastly = {
      writeVCL: sinon.fake.returns({}),
    };

    const indexconfig = await new IndexConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/example-queries.yaml'))
      .init();

    assert.ok(await queries(fastly, 1, indexconfig));

    assert.ok(fastly.writeVCL.calledOnce);
    assert.ok(fastly.writeVCL.calledWith(1, 'queries.vcl'));
  });

  it('#queries/empty', async () => {
    let called = false;

    const fastly = {
      writeVCL: (_0, _1, obj) => {
        assert.equal(obj.content, '');
        called = true;
        return true;
      },
    };

    const indexconfig = await new IndexConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/no-queries.yaml'))
      .init();

    assert.ok(await queries(fastly, 1, indexconfig));

    assert.ok(called);
  });
});
