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
/* eslint-disable no-param-reassign */
function type(line) {
  if (/^\s*$/.test(line)) {
    return {
      type: 'whitespace',
      line,
    };
  } else if (/^\s*#.*$/.test(line)) {
    return {
      type: 'comment',
      line,
    };
  } else if (/^\s*\/\/.*$/.test(line)) {
    return {
      type: 'comment',
      line,
    };
  } else if (/^\s*\/\*.*$/.test(line)) {
    return {
      type: 'commentstart',
      line,
    };
  } else if (/^.*\*\/\s*$/.test(line)) {
    return {
      type: 'commentend',
      line,
    };
  } else if (/^\s*sub .*{\s*$/.test(line)) {
    return {
      type: 'substart',
      name: line.replace(/^\s*sub\s+(\S+)\s*{\s*$/, '$1'),
      line,
    };
  } else if (/^\s*}.*{\s*$/.test(line)) {
    return {
      type: 'blockskip',
      line,
    };
  } else if (/^\s*}\s*$/.test(line)) {
    return {
      type: 'blockend',
      line,
    };
  } else if (/^.*{\s*$/.test(line)) {
    return {
      type: 'blockstart',
      line,
    };
  } else if (/^\s*return(\(.*\))?;\s*$/.test(line)) {
    let to = line.replace(/^\s*return(\(.*\))?;\s*$/, '$1');
    to = to.replace(/[()]/g, '');
    if (!to) {
      to = undefined;
    }
    return {
      type: 'return',
      to,
      line,
    };
  } else if (/^\s*call\s+(.*);\s*$/.test(line)) {
    return {
      type: 'call',
      to: line.replace(/^\s*call\s+(.*);\s*$/, '$1'),
      line,
    };
  } else if (/^\s*set\s+(.*)\s*=.*;\s*$/.test(line)) {
    return {
      type: 'set',
      name: line.replace(/^\s*set\s+(.*)\s=.*;\s*$/, '$1'),
      line,
    };
  }
  return {
    type: 'unknown',
    line,
  };
}

class VCLParser {
  constructor(vcl) {
    this.lines = vcl.split('\n');
    this.before = {};
    this.after = {};
  }

  parse() {
    this.typed = this.lines.map(type);

    let state;
    let name;
    let level = 0;
    let sub = undefined;

    this.typed.forEach((element) => {
      if (element.type === 'commentstart' && state === undefined) {
        state = 'comment';
      } else if (state === 'comment' && element.type === 'commentend') {
        state = undefined;
      } else if (state === 'comment' && element.type) {
        element.type = 'comment';
      } else if (element.type === 'blockstart') {
        level += 1;
        element.level = level;
      } else if (element.type === 'substart') {
        level += 1;
        element.level = level;
        name = element.name;
        sub = element;
        sub.vars = new Set();
      } else if (element.type === 'blockend') {
        level -= 1;
        element.level = level;
        if (level === 0) {
          element.type = 'subend';
          element.name = name;
          element.start = sub;
          sub = undefined;
        }
      } else if (element.type === 'return') {
        element.name = name;
        element.start = sub;
      } else if (element.type === 'call') {
        element.name = name;
        element.start = sub;
      } else if (element.type === 'set') {
        sub.vars.add(element.name);
      }
    });

    return this;
  }

  on(linetype, { before, after }) {
    if (before) {
      this.before[linetype] = before;
    }
    if (after) {
      this.after[linetype] = after;
    }
    return this;
  }

  transform() {
    const lines = [];

    this.typed.forEach((element) => {
      const startingws = /^\s*/;
      const ws = element.line.match(startingws) ? element.line.match(startingws)[0] + '' : '';

      if (this.before[element.type] && this.before[element.type](element)) {
        lines.push(ws + this.before[element.type](element));
      }
      lines.push(element.line);
      if (this.after[element.type] && this.after[element.type](element)) {
        lines.push(ws + this.after[element.type](element));
      }
    });

    return lines.join('\n');
  }
}

module.exports = VCLParser;
