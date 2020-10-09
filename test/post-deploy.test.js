/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const packjson = require('../package.json');
const testcmd = require('../run_tests_cmd_job.json');

function getbaseurl() {
  const namespace = 'helix';
  const package = 'helix-services';
  const name = packjson.name.replace('@adobe/helix-', '');
  let version = `${packjson.version}`;
  if (process.env.CI && process.env.CIRCLE_BUILD_NUM && process.env.CIRCLE_BRANCH !== 'master') {
    version = `ci${process.env.CIRCLE_BUILD_NUM}`;
  }
  return `api/v1/web/${namespace}/${package}/${name}@${version}`;
}

function getbasedomain() {
  console.log(testcmd);
  return process.env.TEST_DOMAIN;
}

describe('Post-Deploy Tests', () => {
  it('Print Test Instructions', async () => {
    // eslint-disable-next-line no-console
    console.log(`Try it yourself:
hlx publish --api-publish https://adobeioruntime.net/${getbaseurl()}`);
  }).timeout(10000);

  it('Print Test Instructions for Helix Pages', async () => {
    // eslint-disable-next-line no-console
    console.log(`Your Helix Pages Test Domain is:
https://owner--repo.${getbasedomain()}`);
  }).timeout(10000);
});
