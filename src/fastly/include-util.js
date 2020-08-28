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

const fs = require('fs-extra');
const path = require('path');

function regex(content, filePath) {
  return content.replace(/\{"regex:block.rgx"\}/g, () => {
    const name = path.resolve(filePath);
    const c = fs.readFileSync(name)
      .toString()
      .split('\n')
      .map(l => l.replace(/[ ]+#.*$/, '')) // enables comments at the end of the line
      .join('|');
    return `"${c}"`;
  });
}

function synthetize(content, filePath) {
  return content.replace(/(synthetic \{"include:.*"\};)/g, (m) => {
    const ref = m.replace(/^synthetic \{"include:/, '').replace(/"};$/, '');
    const name = path.resolve(filePath, ref);
    const c = fs.readFileSync(name).toString();
    return `synthetic {"${c}"};`;
  });
}

function include(srcfile, tracer, opts) {
  const str = tracer
    ? tracer(fs.readFileSync(srcfile).toString(), opts)
    : fs.readFileSync(srcfile).toString();
  return synthetize(str, path.dirname(srcfile));
}

module.exports.include = include;
module.exports.synthetize = synthetize;
module.exports.regex = regex;
