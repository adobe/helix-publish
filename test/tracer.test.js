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

const assert = require('assert');
const tracer = require('../src/vcl/tracer');

const before = `
sub vcl_fake {
  # synthetic response for Static-302: creates a redirect to the immutable URL
  if (obj.status == 902 && req.http.X-Location) {
    set obj.http.Content-Type = "text/html";
    set obj.status = 302;
    set obj.http.Location = req.http.X-Location;
    synthetic "Found: <a href='" + req.http.X-Location+ "'>" + req.http.X-Location + "</a>";
    return(deliver);
  }
  call hlx_error_errors;
}
`;

const after = `
sub vcl_fake {
log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "enter": "vcl_fake",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "data": { } }"json};
  # synthetic response for Static-302: creates a redirect to the immutable URL
  if (obj.status == 902 && req.http.X-Location) {
    set obj.http.Content-Type = "text/html";
    set obj.status = 302;
    set obj.http.Location = req.http.X-Location;
    synthetic "Found: <a href='" + req.http.X-Location+ "'>" + req.http.X-Location + "</a>";
    log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "leave": "vcl_fake",  "next": "deliver",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
    return(deliver);
  }
  log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "from": "vcl_fake",  "call": "hlx_error_errors",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
  call hlx_error_errors;
log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "leave": "vcl_fake",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
}
`;

describe('Tracer Integration Test', () => {
  it('Trace Statements gets Injected', () => {
    assert.equal(tracer(before, 'fake-id', 'epsagon-https', 'fake-token'), after);
  });
});
