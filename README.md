# Helix Publish Microservice


[![Known Vulnerabilities](https://snyk.io/test/github/adobe/helix-publish/badge.svg?targetFile=package.json)](https://snyk.io/test/github/adobe/helix-publish?targetFile=package.json)
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-publish.svg)](https://codecov.io/gh/adobe/helix-publish)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-publish.svg)](https://circleci.com/gh/adobe/helix-publish)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-publish.svg)](https://github.com/adobe/helix-publish/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-publish.svg)](https://github.com/adobe/helix-publish/issues) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/helix-publish.svg)](https://greenkeeper.io/)


> Microservice for publishing Project Helix Fastly service configurations

This microservice sets up a Fastly service config so that it can be used for Project Helix-powered websites. This includes:

- creating VCL for
  - basic Project Helix operations
  - strain resolution based on `condition`s specified in `helix-config.yaml`
  - URL parameter whitelists based on `params` whitelists from `helix-config.yaml`
- updating edge dictionary values for
  - content resolution
  - static asset resolution
- setting correct backends for
  - Adobe I/O Runtime
  - GitHub
  - all proxy strains from `helix-config.yaml`
- setting up redirect rules
  - request conditions
  - `X-Location` headers
  - code that detects `X-Location` headers and turns them into `301` redirects

There are a number of important tasks involved in publishing that it does not do:

- it does not create or activate a version, so that you still have full control over what goes live
- it does not flush cache for you, so that you stay in control here, too

## Usage

Send a POST request with following (`Content-Type: application/json`-encoded) body parameters to `https://adobeioruntime.net/api/v1/web/helix/helix-services/publish@v1`:

* `configuration`: your `helix-config.yaml`, as a JSON document
* `service`: the service ID of your Fastly service config
* `token`: a Fastly authentication token that has `global` permission on the service config
* `version`: the version number of a checked-out (editable) version of the above service config
* `vcl`: an object containing the name of the vcl file (key) to override and its content. For now, only `extensions.vcl` override is supported
* `dispatchVersion`: the version of the dispatch action to use. Defaults to `latest`.

## Developing Helix Publish

You need `node>=8.0.0` and `npm>=5.4.0`. Follow the typical `npm install`, `npm test` workflow.

### Basic Unit Testing

When you run `npm test`, some integration tests that require Fastly credentials will be skipped. This means, you won't get full test coverage, which is not an issue, as the credentials will be used in integration tests running on CircleCI.

### Basic Integration Testing

If you set up a Fastly service configuration and set the `HLX_FASTLY_NAMESPACE`, `HLX_FASTLY_AUTH`, and `VERSION_NUM` environment variables, then re-running `npm test` will also include the integration tests and achieve full code coverage. Note that these integration tests override your existing Fastly service configuration and should not be run against a production service config.

### Local Troubleshooting

If you are having trouble with specific configurations and set-ups, it is possible to intercept the `hlx publish` API call with a developer proxy like [Charles](https://www.charlesproxy.com). To do so, run 

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0  HTTPS_PROXY=http://localhost:4321 hlx publish
```

and save the JSON body of the first `POST` request made to publish `https://adobeioruntime.net/api/v1/web/helix/default/publish` in the `test/troubleshoot` directory. Re-running `npm test` will now pick up your JSON and use it for an integration test, giving you the ability to debug and step through the execution.

### Remote Testing

CircleCI will deploy successful builds (passing all tests) to publish https://adobeioruntime.net/api/v1/web/helix/default/publish-test. You can run `hlx publish --api-publish publish https://adobeioruntime.net/api/v1/web/helix/default/publish-test` to force Helix to use this alternate deployment during the publish process (you can also deploy `helix-publish` to your own namespace and test it there).

[Contributions](CONTRIBUTING.md) are highly welcome.

## Deploying Helix Publish

Deploying Helix Publish requires the `wsk` command line client, authenticated to a namespace of your choice. For Project Helix, we use the `helix` namespace.

Run `npm run deploy` to do a one-shot deploment of Helix Publish. All commits to master that pass the testing will be deployed automatically.
