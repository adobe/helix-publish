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

Send a POST request with following (`Content-Type: application/json`-encoded) body parameters to `https://adobeioruntime.net/api/v1/web/helix/default/publish`:

* `configuration`: your `helix-config.yaml`, as a JSON document
* `service`: the service ID of your Fastly service config
* `token`: a Fastly authentication token that has `global` permission on the service config
* `version`: the version number of a checked-out (editable) version of the above service config

## Developing Helix Publish

You need `node>=8.0.0` and `npm>=5.4.0`. Follow the typical `npm install`, `npm test` workflow.

Contributions are highly welcome.

## Deploying Helix Publish

Deploying Helix Publish requires the `wsk` command line client, authenticated to a namespace of your choice. For Project Helix, we use the `helix` namespace.

Run `npm run deploy` to do a one-shot deploment of Helix Publish. All commits to master that pass the testing will be deployed automatically.

