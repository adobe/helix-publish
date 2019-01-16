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
const { init, updatestrains } = require('../src/fastly/dictionaries');

/* eslint-env mocha */

describe('Testing dictionaries.js', () => {
  it('#init', async () => {
    const fastly = {
      writeDictionary: sinon.fake(),
    };

    assert.ok(await init(fastly, 1));
    assert.equal(fastly.writeDictionary.getCalls().length, 13);
    assert.ok(fastly.writeDictionary.calledWith(1, 'secrets'));
  });

  it('#updatestrains/full', async () => {
    const fastly = {
      writeDictValue: sinon.fake(),
    };

    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();

    assert.ok(await updatestrains(fastly, 1, config.strains));
    assert.equal(fastly.writeDictValue.getCalls().length, 11);

    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_action_roots', 'adhoc', '75f29aa936bfc2b84bde5ac0ee4afbf824b1391e-dirty'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_owners', 'adhoc', 'adobe'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_refs', 'adhoc', 'master'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_repos', 'adhoc', 'project-helix.io'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_root_paths', 'adhoc', ''));
    
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_github_static_repos', 'adhoc', 'project-helix.io'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_github_static_owners', 'adhoc', 'adobe'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_github_static_refs', 'adhoc', 'master'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_github_static_root', 'adhoc', '/htdocs'));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_allow', 'adhoc', ''));
    assert.ok(fastly.writeDictValue.calledWith(1, 'strain_deny', 'adhoc', ''));
  });
});
