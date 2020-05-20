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
const path = require('path');
const tracer = require('../src/vcl/tracer');
const { include } = require('../src/fastly/include-util');

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
log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "epsagon_app": "Helix Fastly Epsagon",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "time": { "start": ""json} time.start.usec {json"",  "elapsed": ""json} time.elapsed.usec {json"" },  "req": { "hostname": ""json} req.http.Host {json"",  "url": ""json} req.url {json"",  "xid": ""json} req.xid {json"" },  "fastly": { "info_state": ""json} fastly_info.state {json"",  "error": ""json} fastly.error {json"" },  "enter": "vcl_fake",  "data": { } }"json};
  # synthetic response for Static-302: creates a redirect to the immutable URL
  if (obj.status == 902 && req.http.X-Location) {
    set obj.http.Content-Type = "text/html";
    set obj.status = 302;
    set obj.http.Location = req.http.X-Location;
    synthetic "Found: <a href='" + req.http.X-Location+ "'>" + req.http.X-Location + "</a>";
    log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "epsagon_app": "Helix Fastly Epsagon",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "time": { "start": ""json} time.start.usec {json"",  "elapsed": ""json} time.elapsed.usec {json"" },  "req": { "hostname": ""json} req.http.Host {json"",  "url": ""json} req.url {json"",  "xid": ""json} req.xid {json"" },  "fastly": { "info_state": ""json} fastly_info.state {json"",  "error": ""json} fastly.error {json"" },  "leave": "vcl_fake",  "next": "deliver",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
    return(deliver);
  }
  log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "epsagon_app": "Helix Fastly Epsagon",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "time": { "start": ""json} time.start.usec {json"",  "elapsed": ""json} time.elapsed.usec {json"" },  "req": { "hostname": ""json} req.http.Host {json"",  "url": ""json} req.url {json"",  "xid": ""json} req.xid {json"" },  "fastly": { "info_state": ""json} fastly_info.state {json"",  "error": ""json} fastly.error {json"" },  "from": "vcl_fake",  "call": "hlx_error_errors",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
  call hlx_error_errors;
log {"syslog fake-id epsagon-https :: "} {json"{ "epsagon_token": "fake-token",  "epsagon_app": "Helix Fastly Epsagon",  "x-cdn-request-id": ""json} req.http.x-cdn-request-id {json"",  "time": { "start": ""json} time.start.usec {json"",  "elapsed": ""json} time.elapsed.usec {json"" },  "req": { "hostname": ""json} req.http.Host {json"",  "url": ""json} req.url {json"",  "xid": ""json} req.xid {json"" },  "fastly": { "info_state": ""json} fastly_info.state {json"",  "error": ""json} fastly.error {json"" },  "leave": "vcl_fake",  "data": { "obj.http.Content-Type": ""json} obj.http.Content-Type {json"",  "obj.status": ""json} obj.status {json"",  "obj.http.Location": ""json} obj.http.Location {json"" } }"json};
}
`;

describe('Tracer Integration Test', () => {
  it('Trace Statements gets Injected', () => {
    const result = tracer(before, {
      serviceId: 'fake-id',
      loggerName: 'epsagon-https',
      epsagonToken: 'fake-token',
    });
    // console.log(result);
    assert.equal(result, after);
  });

  it('Trace Statements get injected into helix.vcl', () => {
    const result = include(path.resolve(__dirname, '../layouts/fastly/helix.vcl'), tracer, {
      serviceId: 'fake-id',
      loggerName: 'helix-epsagon',
      epsagonToken: 'fake-token',
    });
    assert.ok(result);
    // just don't throw
  });
});
