# [2.0.0](https://github.com/adobe/helix-publish/compare/v1.0.3...v2.0.0) (2019-06-26)


### Bug Fixes

* **error:** fix remaining resp ([d89b2f6](https://github.com/adobe/helix-publish/commit/d89b2f6))
* **error:** separate error handler from raw handler ([00beb7a](https://github.com/adobe/helix-publish/commit/00beb7a))
* **error:** use http.host ([03b4ec3](https://github.com/adobe/helix-publish/commit/03b4ec3))
* **error:** use new error subroutin ([29cac81](https://github.com/adobe/helix-publish/commit/29cac81))
* **error:** use resp instead of beresp in error delivery ([dab068b](https://github.com/adobe/helix-publish/commit/dab068b))
* **package:** add missing error pages ([ebcf05c](https://github.com/adobe/helix-publish/commit/ebcf05c))
* **raw:** set correct content type for popular file endings ([1455d3f](https://github.com/adobe/helix-publish/commit/1455d3f))
* **raw:** set correct content type for raw HTML responses ([fafd955](https://github.com/adobe/helix-publish/commit/fafd955))
* **static:** use the versioned shared static function ([2e18192](https://github.com/adobe/helix-publish/commit/2e18192))
* **vcl:** add missing equals sign for request parameters ([c238503](https://github.com/adobe/helix-publish/commit/c238503))
* **vcl:** always use HTML for error pages ([dec8b51](https://github.com/adobe/helix-publish/commit/dec8b51))
* **vcl:** fix data flow error ([22897d1](https://github.com/adobe/helix-publish/commit/22897d1))
* **vcl:** fix req.http.X-Action-Root ([c6c7e7d](https://github.com/adobe/helix-publish/commit/c6c7e7d))
* **vcl:** fix syntax error ([e28ec3d](https://github.com/adobe/helix-publish/commit/e28ec3d))
* **vcl:** fix syntax error ([6825bae](https://github.com/adobe/helix-publish/commit/6825bae))
* **vcl:** fix syntax error ([1fe37f2](https://github.com/adobe/helix-publish/commit/1fe37f2))
* **vcl:** fix syntax error ([b0b9829](https://github.com/adobe/helix-publish/commit/b0b9829))
* **vcl:** fix syntax error ([ebf0807](https://github.com/adobe/helix-publish/commit/ebf0807))
* **vcl:** fix syntax error ([d8afe05](https://github.com/adobe/helix-publish/commit/d8afe05))
* **vcl:** move error from fetch to deliver ([061fa10](https://github.com/adobe/helix-publish/commit/061fa10))
* **vcl:** relax conditions for 302 and url extensions ([8da5e1e](https://github.com/adobe/helix-publish/commit/8da5e1e))
* **vcl:** remove error request type ([9c72d4b](https://github.com/adobe/helix-publish/commit/9c72d4b))
* **vcl:** remove unused error subroutine ([a58e8e0](https://github.com/adobe/helix-publish/commit/a58e8e0))
* **vcl:** remove unused raw function ([9fb2e05](https://github.com/adobe/helix-publish/commit/9fb2e05))
* **vcl:** remove unused subroutines ([1cbdec4](https://github.com/adobe/helix-publish/commit/1cbdec4))
* **vcl:** shut up chatty headers ([31fcc7c](https://github.com/adobe/helix-publish/commit/31fcc7c))
* **vlc:** don't drop out of error handler function ([35a9f81](https://github.com/adobe/helix-publish/commit/35a9f81))


### Features

* **static:** Give content repository precedence in serving resources and error pages ([bf8cbae](https://github.com/adobe/helix-publish/commit/bf8cbae)), closes [#96](https://github.com/adobe/helix-publish/issues/96)
* **vcl:** introduce new dispatch flow ([53a3dbe](https://github.com/adobe/helix-publish/commit/53a3dbe)), closes [#96](https://github.com/adobe/helix-publish/issues/96) [#105](https://github.com/adobe/helix-publish/issues/105) [#96](https://github.com/adobe/helix-publish/issues/96)


### BREAKING CHANGES

* **static:** As described in #96, this introduces a new request type `raw` which works like the old `image` request type, but applies to all resources. In case `raw` fails, we will fall back to `pipeline`, which will fall back to `static` which will fall back to `error`. `error` is very similar to `raw` in that it tries to fetch an error page like `404.html` from the content repository

## [1.0.3](https://github.com/adobe/helix-publish/compare/v1.0.2...v1.0.3) (2019-06-25)


### Bug Fixes

* **bundle:** use different approach to access files ([845c0d9](https://github.com/adobe/helix-publish/commit/845c0d9))
* **vcl.js:** use different approach to detect webpack ([c356c1b](https://github.com/adobe/helix-publish/commit/c356c1b))

## [1.0.2](https://github.com/adobe/helix-publish/compare/v1.0.1...v1.0.2) (2019-06-25)


### Bug Fixes

* **dependencies:** move epsagon from dev to real dependencies ([99a9629](https://github.com/adobe/helix-publish/commit/99a9629))

## [1.0.1](https://github.com/adobe/helix-publish/compare/v1.0.0...v1.0.1) (2019-06-25)


### Bug Fixes

* **build:** include missing VCL and HTML files in deployment bundle ([17aa8ee](https://github.com/adobe/helix-publish/commit/17aa8ee))

# 1.0.0 (2019-06-24)


### Bug Fixes

* **static:** process ESI for static resources, too ([8ea480d](https://github.com/adobe/helix-publish/commit/8ea480d))
* .snyk & package.json to reduce vulnerabilities ([d68bf41](https://github.com/adobe/helix-publish/commit/d68bf41))
* .snyk & package.json to reduce vulnerabilities ([c2314e5](https://github.com/adobe/helix-publish/commit/c2314e5))
* **deploy:** use nodejs:10 container ([b64541e](https://github.com/adobe/helix-publish/commit/b64541e)), closes [#55](https://github.com/adobe/helix-publish/issues/55)
* **dictionaries:** set missing directory index ([ef56581](https://github.com/adobe/helix-publish/commit/ef56581)), closes [#59](https://github.com/adobe/helix-publish/issues/59)
* **linting:** linting again... ([b496576](https://github.com/adobe/helix-publish/commit/b496576))
* **linting:** linting... ([275494f](https://github.com/adobe/helix-publish/commit/275494f))
* **monitoring:** remove epsagon token from source code ([be35e31](https://github.com/adobe/helix-publish/commit/be35e31))
* **package:** update @adobe/fastly-native-promises to version 1.10.0 ([258c5eb](https://github.com/adobe/helix-publish/commit/258c5eb))
* **package:** update @adobe/fastly-native-promises to version 1.4.0 ([c29ed05](https://github.com/adobe/helix-publish/commit/c29ed05))
* **package:** update @adobe/fastly-native-promises to version 1.6.0 ([dba6bd0](https://github.com/adobe/helix-publish/commit/dba6bd0)), closes [#17](https://github.com/adobe/helix-publish/issues/17)
* **package:** update @adobe/fastly-native-promises to version 1.6.1 ([8b755ae](https://github.com/adobe/helix-publish/commit/8b755ae))
* **package:** update @adobe/fastly-native-promises to version 1.7.0 ([8955790](https://github.com/adobe/helix-publish/commit/8955790))
* **package:** update @adobe/fastly-native-promises to version 1.8.0 ([23c37eb](https://github.com/adobe/helix-publish/commit/23c37eb))
* **package:** update @adobe/fastly-native-promises to version 1.9.0 ([68c16f6](https://github.com/adobe/helix-publish/commit/68c16f6))
* **package:** update @adobe/fastly-native-promises to version 1.9.1 ([de465f3](https://github.com/adobe/helix-publish/commit/de465f3))
* **package:** update @adobe/helix-shared to version 0.10.3 ([7c9caef](https://github.com/adobe/helix-publish/commit/7c9caef))
* **package:** update @adobe/helix-shared to version 0.10.4 ([d4b5e92](https://github.com/adobe/helix-publish/commit/d4b5e92))
* **package:** update @adobe/helix-shared to version 0.10.5 ([fd67213](https://github.com/adobe/helix-publish/commit/fd67213))
* **package:** update @adobe/helix-shared to version 0.11.0 ([d976bcb](https://github.com/adobe/helix-publish/commit/d976bcb))
* **package:** update @adobe/helix-shared to version 0.6.2 ([20703f3](https://github.com/adobe/helix-publish/commit/20703f3))
* **package:** update @adobe/helix-shared to version 0.7.0 ([d49ba13](https://github.com/adobe/helix-publish/commit/d49ba13))
* **package:** update @adobe/helix-shared to version 0.8.0 ([4731732](https://github.com/adobe/helix-publish/commit/4731732))
* **package:** update @adobe/helix-shared to version 0.8.1 ([024f137](https://github.com/adobe/helix-publish/commit/024f137))
* **package:** update @adobe/helix-shared to version 0.8.3 ([6dd418b](https://github.com/adobe/helix-publish/commit/6dd418b))
* **package:** update @adobe/helix-shared to version 0.8.4 ([feaf8eb](https://github.com/adobe/helix-publish/commit/feaf8eb))
* **package:** update @adobe/helix-shared to version 1.0.1 ([ffad201](https://github.com/adobe/helix-publish/commit/ffad201)), closes [#67](https://github.com/adobe/helix-publish/issues/67)
* **package:** update @adobe/helix-shared to version 1.0.2 ([f3c27b6](https://github.com/adobe/helix-publish/commit/f3c27b6))
* **package:** update @adobe/helix-shared to version 1.1.1 ([c1bf275](https://github.com/adobe/helix-publish/commit/c1bf275))
* **package:** update @adobe/helix-shared to version 1.2.0 ([41faf50](https://github.com/adobe/helix-publish/commit/41faf50))
* **package:** update @adobe/helix-shared to version 1.3.1 ([d002710](https://github.com/adobe/helix-publish/commit/d002710))
* **package:** update @adobe/helix-shared to version 1.5.0 ([1a61355](https://github.com/adobe/helix-publish/commit/1a61355))
* **package:** update fs-extra to version 8.0.1 ([cffa67c](https://github.com/adobe/helix-publish/commit/cffa67c))
* **package:** update glob-to-regexp to version 0.4.1 ([5b0782f](https://github.com/adobe/helix-publish/commit/5b0782f))
* **proxy:** Don't attempt to recover from 404 errors in proxy strains ([8b84690](https://github.com/adobe/helix-publish/commit/8b84690)), closes [#75](https://github.com/adobe/helix-publish/issues/75)
* **proxy:** prevent duplicate creation of backends for proxy strains ([c157e8b](https://github.com/adobe/helix-publish/commit/c157e8b))
* **proxy:** use FastlyJSON when talking to Fastly API ([9d40b93](https://github.com/adobe/helix-publish/commit/9d40b93))
* **static:** add missing slash to GitHub raw URL ([c07f401](https://github.com/adobe/helix-publish/commit/c07f401))
* **static:** disable GZip for all backend requests that could contain ESI ([393ae0a](https://github.com/adobe/helix-publish/commit/393ae0a))
* **static:** don't redeclare var ([3f23556](https://github.com/adobe/helix-publish/commit/3f23556))
* **static:** drop accept-encoding to enforce esi ([2729f64](https://github.com/adobe/helix-publish/commit/2729f64))
* **static:** enable compression for ESI-processed resources ([0eaf027](https://github.com/adobe/helix-publish/commit/0eaf027))
* **static:** fix syntax error ([852969a](https://github.com/adobe/helix-publish/commit/852969a))
* **static:** fix syntax error ([82949b0](https://github.com/adobe/helix-publish/commit/82949b0))
* **static:** fix syntax error ([d22c465](https://github.com/adobe/helix-publish/commit/d22c465))
* **static:** fix variable name ([cbb125e](https://github.com/adobe/helix-publish/commit/cbb125e))
* **static:** fix VCL syntax error ([db4c524](https://github.com/adobe/helix-publish/commit/db4c524))
* **static:** fix VCL syntax error ([76749d6](https://github.com/adobe/helix-publish/commit/76749d6))
* **static:** handle immutable requests without restart ([79c0ba7](https://github.com/adobe/helix-publish/commit/79c0ba7))
* **static:** move esi handling into fetch ([46bc081](https://github.com/adobe/helix-publish/commit/46bc081))
* **static:** never use GZip when talking with Runtime, as there might be ESI ([21ce4a1](https://github.com/adobe/helix-publish/commit/21ce4a1))
* **static:** no slash between ref and path in static retrieval ([209cd7f](https://github.com/adobe/helix-publish/commit/209cd7f))
* **static:** protect against cache poisoning by verifying the etag ([1bc1e24](https://github.com/adobe/helix-publish/commit/1bc1e24))
* **static:** remove brackets in URL ([4009ff5](https://github.com/adobe/helix-publish/commit/4009ff5))
* **static:** restrict regex for immutable resources ([c71043f](https://github.com/adobe/helix-publish/commit/c71043f))
* **static:** strip 302 from URL when requesting a redirect ([fd5a5db](https://github.com/adobe/helix-publish/commit/fd5a5db))
* **static:** submit location headers for redirects, making actual redirects possible ([615bf33](https://github.com/adobe/helix-publish/commit/615bf33))
* **static:** throw error for invalid resource paths ([92d4c82](https://github.com/adobe/helix-publish/commit/92d4c82))
* **static:** turn on ESI processing when backend response requests it ([5459d30](https://github.com/adobe/helix-publish/commit/5459d30))
* **static:** unset Accept-Encoding more aggressively ([df42f20](https://github.com/adobe/helix-publish/commit/df42f20))
* **static:** use beresp instead of resp for ETag value ([112796d](https://github.com/adobe/helix-publish/commit/112796d))
* **static:** use correct location header ([5d1f8c7](https://github.com/adobe/helix-publish/commit/5d1f8c7))
* **static:** use correct path for entry for immutable resources ([c66f15f](https://github.com/adobe/helix-publish/commit/c66f15f))
* **static:** use local var for new extension ([c995533](https://github.com/adobe/helix-publish/commit/c995533))
* **static:** use re instead of req ([245b583](https://github.com/adobe/helix-publish/commit/245b583))
* **static:** use req for tracing instead of resp ([806d48d](https://github.com/adobe/helix-publish/commit/806d48d))
* **vcl:** bum version ([73d3f8e](https://github.com/adobe/helix-publish/commit/73d3f8e))
* **vcl:** copyright & unrelated change ([e88ed93](https://github.com/adobe/helix-publish/commit/e88ed93))
* **vcl:** include must be outside of a subroutine ([cef774f](https://github.com/adobe/helix-publish/commit/cef774f))
* **vcl:** is line break required ? ([67080b2](https://github.com/adobe/helix-publish/commit/67080b2))
* **vcl:** is linebreak required? ([9cc1ea2](https://github.com/adobe/helix-publish/commit/9cc1ea2))
* **vcl:** remove unnecessary line breaks ([8502341](https://github.com/adobe/helix-publish/commit/8502341))
* **vcl:** respect remapped url also in static ([f404c4d](https://github.com/adobe/helix-publish/commit/f404c4d)), closes [#101](https://github.com/adobe/helix-publish/issues/101)


### Features

* **monitoring:** add epsagon wrapper ([2d52627](https://github.com/adobe/helix-publish/commit/2d52627)), closes [#104](https://github.com/adobe/helix-publish/issues/104)
* **proxy:** make proxy strains respect the URL path and backend path ([ff77ba7](https://github.com/adobe/helix-publish/commit/ff77ba7))
* **static:** enable asset statification for assets loaded from static URLs ([befc1e2](https://github.com/adobe/helix-publish/commit/befc1e2))
* **static:** provide two new resource types for static resources: .esi to replace a static URL with a cacheable static URL and .hlx_[0-9a-f]+ for resources that are cached forever in the browser ([9f8e52c](https://github.com/adobe/helix-publish/commit/9f8e52c)), closes [/github.com/adobe/helix-pipeline/issues/224#issuecomment-476690621](https://github.com//github.com/adobe/helix-pipeline/issues/224/issues/issuecomment-476690621)
* **static:** rename static-esi to static-url, introduce static-302 which returns a redirect ([403ae1b](https://github.com/adobe/helix-publish/commit/403ae1b)), closes [/github.com/adobe/helix-publish/pull/61#issuecomment-487664612](https://github.com//github.com/adobe/helix-publish/pull/61/issues/issuecomment-487664612)
* **vcl:** Add extensions.vcl ([ae1b52c](https://github.com/adobe/helix-publish/commit/ae1b52c))
* **vcl:** add more extension points ([979cfbe](https://github.com/adobe/helix-publish/commit/979cfbe))
* **vcl:** Add more extension points ([3dee07e](https://github.com/adobe/helix-publish/commit/3dee07e))
* **vcl:** Documentation ([902f6f3](https://github.com/adobe/helix-publish/commit/902f6f3))
* **vcl:** Support Custom VCL ([b2ca735](https://github.com/adobe/helix-publish/commit/b2ca735))
* **vcl:** testing extension logic ([717c192](https://github.com/adobe/helix-publish/commit/717c192))
* **vcl:** Tests for synthetize method ([71bcd2d](https://github.com/adobe/helix-publish/commit/71bcd2d))


### Performance Improvements

* **static:** declare static files to be immutable ([f0369b7](https://github.com/adobe/helix-publish/commit/f0369b7))


### BREAKING CHANGES

* **proxy:** changes root paths of all proxy strains - fixes #64
