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
const { regexp } = require('./vcl-utils');

const dictionaries = [
  'secrets',
  'strain_action_roots',
  'strain_owners',
  'strain_refs',
  'strain_repos',
  'strain_root_paths',
  'strain_github_static_repos',
  'strain_github_static_owners',
  'strain_github_static_refs',
  'strain_github_static_root',
  'strain_index_files',
  'strain_allow',
  'strain_deny',
];

async function init(fastly, version) {
  return Promise.all(dictionaries.map(dictionary => fastly.writeDictionary(
    version,
    dictionary,
    {
      name: dictionary,
      write_only: true,
    },
  )));
}

function ops(oldops = [], key, value) {
  return [...oldops, {
    op: 'upsert',
    item_key: key,
    item_value: value,
  }];
}

function upsertstrain(p, dict, key, value) {
  // eslint-disable-next-line no-param-reassign
  p[dict] = ops(p[dict], key, value);
}

async function updatestrains(fastly, version, strains) {
  const runtimestrains = strains.getRuntimeStrains();
  const deployedstrains = runtimestrains.filter(strain => !!strain.package);
  const strainoperations = deployedstrains.reduce((p, strain) => {
    upsertstrain(p, 'strain_action_roots', strain.name, strain.package);

    upsertstrain(p, 'strain_owners', strain.name, strain.content.owner);
    upsertstrain(p, 'strain_refs', strain.name, strain.content.ref);
    upsertstrain(p, 'strain_repos', strain.name, strain.content.repo);
    upsertstrain(p, 'strain_root_paths', strain.name, strain.content.path);


    upsertstrain(p, 'strain_github_static_repos', strain.name, strain.static.repo);
    upsertstrain(p, 'strain_github_static_owners', strain.name, strain.static.owner);
    upsertstrain(p, 'strain_github_static_refs', strain.name, strain.static.ref);
    upsertstrain(p, 'strain_github_static_root', strain.name, strain.static.path);
    upsertstrain(p, 'strain_allow', strain.name, regexp(strain.static.allow));
    upsertstrain(p, 'strain_deny', strain.name, regexp(strain.static.deny));

    return p;
  }, {});

  const updates = Object.entries(strainoperations).reduce((p, [dictname, operations]) => {
    p.push(fastly.bulkUpdateDictItems(version, dictname, ...operations));
    return p;
  }, []);

  return Promise.all(updates);
}

module.exports = {
  init, updatestrains,
};
