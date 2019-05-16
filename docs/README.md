# Helix Publish Architecture

## Runtime Action

- uses Fastly Native Promises
- uses Fastly API
- updates an existing Fastly Service Config and reports success

## VCL

VCL is a domain specific language for specifying a state machine for HTTP request and response processing. The processing flow is shown in the diagram below (adapted from [Varnish Docs](https://github.com/jensens/varnish-docs/blob/master/varnish-vcl-flow.svg)).

![Complete VCL Flow](./vcl/Complete%20VCL%20Flow.svg)

A simplified view (adapted from the [Varnish Book](https://book.varnish-software.com/3.0/VCL_Basics.html#vcl-request-flow)) can be seen below.

![Core VCL Flow](./vcl/Core%20VCL%20Flow.svg)

The Helix Flow leverages the basic capabilities of the VCL state engine and implements multiple request types:

- `pipeline` calls an action in Adobe Runtime, built with [Helix Pipeline](https://github.com/adobe/helix-pipeline/) or following a compatible API. On success, the output will be delivered. When the request fails, a restart is attempted using the `static` request type.
- `static` calls the [Helix Static](https://github.com/adobe/helix-static/) Action on Adobe I/O Runtime. On success, the output will be delivered. If the output is too large for Adobe I/O Runtime, the static action might indicate this with a `307` status code, in which case the request is restarted with the `redirect` request type.
- `request` calls GitHub directly and delivers the response with the headers set in the previous iteration of the `static` request.
- `image` is similar to `pipeline`, but retrieves the resource directly from the content repository first. If that fails, it falls back to the `static` request type.
- `static_url` is a variant of the `static` pipeline that calls the same [Helix Static](https://github.com/adobe/helix-static/) Action on Adobe I/O Runtime, but returns a long-cacheable URL as `text/plain` resource
- `static_302` does the same as `static_url`, except that the response is a HTTP 302 redirect pointing to the long-cacheable URL
- `proxy` is for proxy strains and simply passes through the response of another origin server
- `embed` calls the [Helix Embed](https://github.com/adobe/helix-embed/) Action on Adobe I/O Runtime

![Helix Flow](./vcl/Helix%20Flow.svg)