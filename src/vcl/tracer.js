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

// list of values to ignore every time
const ignore = [
  'req.http.X-PreFetch-Miss',
  'req.http.X-PreFetch-Pass',
  'req.http.X-Trace',
  'beresp.http.X-PreFetch-Miss',
  'beresp.http.X-PreFetch-Pass',
];

// list of values to include every time (rember that only req is readable at any time)
const alwaysinclude = [
  'req.http.user-agent',
  'req.http.accept',
  'req.http.referer'
];

/**
 * List all vars that have been set in a subroutine and add them to the data
 */
function logvars(start) {
  const usedvars = [...alwaysinclude, ...Array.from(start.vars)].reduce((data, varname) => {
    if (!ignore.includes(varname)) {
      // eslint-disable-next-line no-param-reassign
      data[varname] = vcl([varname]);
    }
    return data;
  }, {});

  return usedvars;
}

function addEpsagonTraces(txt, {
  serviceId, loggerName, epsagonToken, epsagonAppName,
}) {
  function formatLog(schema) {
    return `log {"syslog ${serviceId} ${loggerName} :: "} ${toString(schema)};`;
  }

  const shared = {
    // self-explanatory
    epsagon_token: str(epsagonToken),
    // the app name, currently hardcoded
    epsagon_app: str(epsagonAppName || 'Helix Fastly Epsagon'),
    // request ID, can be used to connect Fastly to OpenWhisk
    'x-cdn-request-id': vcl`req.http.x-cdn-request-id`,
    // once again – this should become the OW activation or transaction ID
    'x-request-id': vcl`req.http.x-request-id`,
    time: {
      // start time of the request in microseconds since 1970
      start: vcl`time.start.usec`,
      // elapsed time in request processing. Add time.start to get current time
      elapsed: vcl`time.elapsed.usec`,
    },
    req: {
      // hostname
      hostname: vcl`req.http.Host`,
      // URL after the hostname, includes URL params
      url: vcl`req.url`,
      // Request ID generated by Fastly
      xid: vcl`req.xid`,
    },
    fastly: {
      // https://developer.fastly.com/reference/vcl/variables/miscellaneous/fastly-info-state/
      info_state: vcl`fastly_info.state`,
      // https://developer.fastly.com/reference/vcl/variables/miscellaneous/fastly-error/
      error: vcl`fastly.error`,
    },
  };

  /**
   * Entering a subroutine, data is empty because no vars have been set yet
   */
  function tracesubentry({ name }) {
    return formatLog({
      ...shared,
      enter: str(name),
      data: {},
    });
  }

  /*
   * Exiting a subroutine normally
  */
  function tracesubexit({ name, start }) {
    return formatLog({
      ...shared,
      leave: str(name),
      data: logvars(start),
    });
  }

  /**
  * Return from a subroutine to a defined state in the state machine
  */
  function tracereturn({ name, to, start }) {
    return formatLog({
      ...shared,
      leave: str(name),
      next: str(to),
      data: logvars(start),
    });
  }

  /**
  * Calling a different subroutine
 */
  function tracecall({ name, to, start }) {
    return formatLog({
      ...shared,
      from: str(name),
      call: str(to),
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
