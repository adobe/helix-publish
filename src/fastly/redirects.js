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
const { pattern2vcl, condition } = require('./vcl-utils');

function listredirects(strains) {
  const redirectingstrains = strains.getByFilter(strain => strain.redirects.length);
  // go over all strains (that have redirects)
  return redirectingstrains.reduce((p, { name, redirects }) => {
    // go over all redirects per strain
    redirects.reduce((q, redirect) => {
      // collect a new from, to, name tuple
      q.push({
        from: redirect.from,
        to: redirect.to,
        strain: name,
      });
      return q;
    }, p);
    return p;
  }, []);
}

function updatestrains(fastly, version, strains) {
  const redirects = listredirects(strains).map(({ from, to, strain }) => ({
    condition: condition(from, strain),
    expression: pattern2vcl(to),
  }));

  const update = fastly.headers.update(
    version,
    'REQUEST',
    'Created by helix-publish for Redirects',
    'hlx-pub-redirect',
    'set',
    'http.X-Location',
    'request',
  );

  return update(...redirects);
}

module.exports = {
  listredirects, updatestrains,
};
