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
function encode(expression, parameters) {
  if (!expression) {
    return '""';
  }
  return parameters.reduce((expr, param) => {
    return '"' + expr.replace('%24%7B' + param + '%7D', `" + regsub(querystring.filter_except(req.url, "${param}"), "^.*=", "") + "`);
  }, encodeURIComponent(expression)) + '"';
}

function queryvclsnippet(index, query) {
  console.log('making vcl for', index, query.name);
  return `if (req.url.path == "/_query/${index}/${query.name}") {
  set req.http.X-Surrogate-Control = "max-age=${query.cache}";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "${index}" # from the index name
   + "?query=" + ${encode(query.query, query.parameters)}
   + "&filters=" + ${encode(query.filters, query.parameters)}
   + "&facets=" + ${encode(query.facets, query.parameters)};
}`;
}

function queryvcl(indices) {
  function * snippets() {
    for (let i = 0;i < indices.length; ++i) {
      for (let j = 0;j< indices[i].queries.length;++j) {
        yield queryvclsnippet(indices[i].name, indices[i].queries[j]);
      }
    }
  }
  return Array.from(snippets()).join('\n');
}

module.exports = { queryvcl, encode };
