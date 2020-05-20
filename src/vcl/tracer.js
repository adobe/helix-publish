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
  toString, vcl, str,
} = require('./schemahelper');
/**
 * List all vars that have been set in a subroutine and add them to the data
 */
function logvars(start) {
  return Array.from(start.vars).reduce((data, varname) => {
    // eslint-disable-next-line no-param-reassign
    data[varname] = vcl([varname]);
    return data;
  }, {});
}

function addEpsagonTraces(txt, { serviceId, loggerName, epsagonToken }) {
  function formatLog(schema) {
    return `log {"syslog ${serviceId} ${loggerName} :: "} ${toString(schema)};`;
  }

  /**
   * Entering a subroutine, data is empty because no vars have been set yet
   */
  function tracesubentry({ name }) {
    return formatLog({
      epsagon_token: str(epsagonToken),
      epsagon_app: str('Helix Fastly Epsagon'),
      enter: str(name),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: {},
    });
  }

  /*
   * Exiting a subroutine normally
  */
  function tracesubexit({ name, start }) {
    return formatLog({
      epsagon_token: str(epsagonToken),
      epsagon_app: str('Helix Fastly Epsagon'),
      leave: str(name),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: logvars(start),
    });
  }

  /**
  * Return from a subroutine to a defined state in the state machine
  */
  function tracereturn({ name, to, start }) {
    return formatLog({
      epsagon_token: str(epsagonToken),
      epsagon_app: str('Helix Fastly Epsagon'),
      leave: str(name),
      next: str(to),
      'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
      data: logvars(start),
    });
  }

  /**
  * Calling a different subroutine
 */
  function tracecall({ name, to, start }) {
    return formatLog({
      epsagon_token: str(epsagonToken),
      epsagon_app: str('Helix Fastly Epsagon'),
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
