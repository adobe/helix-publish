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
  const cleanexpression = expression.replace(/\n/g, '');
  if (!parameters || parameters.length === 0) {
    return `"${encodeURIComponent(cleanexpression)}"`;
  }
  return `${parameters.reduce((expr, param) => `"${expr.replace(`%24%7B${param}%7D`, `" + regsub(querystring.filter_except(req.url, "${param}"), "^[^=]*=?", "") + "`)}`, encodeURIComponent(cleanexpression))}"`;
}

function queryvclsnippet(index, query) {
  return `if (req.url.path == "/_query/${index}/${query.name}") {
  set req.http.X-Surrogate-Control = "max-age=${query.cache}";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "${index}" # from the index name
   + "?query=" + ${encode(query.query, query.parameters)}
   + "&filters=" + ${encode(query.filters, query.parameters)}
   + "&facets=" + ${encode(query.facets, query.parameters)}
   + "&page=" + regsub(querystring.filter_except(req.url, "page"), "^[^=]*=?", "")
   + "&hitsPerPage=${query.hitsPerPage}";
}`;
}

function queryvcl(indices) {
  function* snippets() {
    for (let i = 0; i < indices.length; i += 1) {
      for (let j = 0; j < indices[i].queries.length; j += 1) {
        yield queryvclsnippet(indices[i].name, indices[i].queries[j]);
      }
    }
  }
  return Array.from(snippets()).join('\n');
}

module.exports = { queryvcl, encode };
