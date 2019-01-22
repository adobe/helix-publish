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
const publish = require('./src/publish');

/* eslint-disable no-console */
/* eslint-disable no-unreachable */
async function main(params) {
  console.log('starting action');

  try {
    console.log('running publish');
    const result = await publish(
      params.configuration,
      params.service,
      params.token,
      params.version,
    );
    console.log('got a result');

    return {
      body: {
        status: 'OK',
        result,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: {
        status: 'Error',
        error: e.toString(),
        stack: e.stack.split('\n'),
      },
    };
  }
}

module.exports.main = main;
