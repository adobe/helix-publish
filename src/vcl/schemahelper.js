/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const BGN = '{json"';
const END = '"json}';

function toString(schema, root = true) {
  if (typeof schema === 'object') {
    const res = [];
    if (root) {
      res.push(BGN);
    }
    res.push(`{${Object
      .entries(schema)
      .map(([key, value]) => ` "${key}": ${toString(value, false)}`).join(', ')} }`);
    if (root) {
      res.push(END);
    }
    return res.join('');
  } else {
    return schema;
  }
}

function vcl([expr]) {
  return `"${END} ${expr} ${BGN}"`;
}

function str(expr) {
  return `"${expr}"`;
}

module.exports = {
  toString, vcl, str,
};
