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

const Parser = require('./parser');
const {
  toString, vcl, str
} = require('./schemahelper');

function logvars(start) {
  return Array.from(start.vars).reduce((data, varname) => {
    data[varname] = vcl([varname]);
    return data;
  }, {});
}

function addEpsagonTraces(txt, serviceid, logname, token) {
  function formatLog(schema) {
    return `log {"syslog ${serviceid} ${logname} :: "} ${toString(schema)};`;
  }

  function tracesubentry({ name }) {
    return formatLog({
      epsagon_token: str(token),
      enter: str(name),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: {},
    });
  }

  function tracesubexit({ name, start }) {
    return formatLog({
      epsagon_token: str(token),
      leave: str(name),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: logvars(start),
    });
  }

  function tracereturn({ name, to, start }) {
    return formatLog({
      epsagon_token: str(token),
      leave: str(name),
      next: str(to),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: logvars(start),
    });
  }

  function tracecall({ name, to, start }) {
    return formatLog({
      epsagon_token: str(token),
      from: str(name),
      call: str(to),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: logvars(start),
    });
  }

  return new Parser(txt)
    .parse()
    .on('substart', { after: tracesubentry })
    .on('subend', { before: tracesubexit })
    .on('return', { before: tracereturn })
    .on('call', { before: tracecall })
    .transform();
}

module.exports = addEpsagonTraces;
