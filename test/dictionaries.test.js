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
      bulkUpdateDictItems: sinon.fake(),
    };

    const config = await new HelixConfig()
      .withConfigPath(path.resolve(__dirname, 'fixtures/full.yaml'))
      .init();

    assert.ok(await updatestrains(fastly, 1, config.strains));
    assert.equal(fastly.bulkUpdateDictItems.getCalls().length, 12);

    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_action_roots', { op: 'upsert', item_key: 'adhoc', item_value: 'mrosier/75f29aa936bfc2b84bde5ac0ee4afbf824b1391e-dirty' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_owners', { op: 'upsert', item_key: 'adhoc', item_value: 'adobe' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_refs', { op: 'upsert', item_key: 'adhoc', item_value: 'master' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_repos', { op: 'upsert', item_key: 'adhoc', item_value: 'project-helix.io' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_root_paths', { op: 'upsert', item_key: 'adhoc', item_value: '' }));

    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_index_files', { op: 'upsert', item_key: 'adhoc', item_value: 'foo.html' }));

    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_github_static_repos', { op: 'upsert', item_key: 'adhoc', item_value: 'project-helix.io' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_github_static_owners', { op: 'upsert', item_key: 'adhoc', item_value: 'adobe' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_github_static_refs', { op: 'upsert', item_key: 'adhoc', item_value: 'master' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_github_static_root', { op: 'upsert', item_key: 'adhoc', item_value: '/htdocs' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_allow', { op: 'upsert', item_key: 'adhoc', item_value: '' }));
    assert.ok(fastly.bulkUpdateDictItems.calledWith(1, 'strain_deny', { op: 'upsert', item_key: 'adhoc', item_value: '' }));
  });
});
