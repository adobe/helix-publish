# This file handles the URL parameter allowlist
if (req.http.X-Strain == "pipeline") {
  set req.http.X-Old-Url = req.url;
  set req.url = querystring.regfilter_except(req.url, "^search$|^lang$|^hlx_.*$");
  set req.http.X-Encoded-Params = urlencode(req.url.qs);
  set req.url = req.http.X-Old-Url;
} elseif (req.http.X-Strain == "proxy") {
  set req.http.X-Old-Url = req.url;
  set req.url = querystring.regfilter_except(req.url, "^search.*$|^.*lang$|^hlx_.*$");
  set req.http.X-Encoded-Params = urlencode(req.url.qs);
  set req.url = req.http.X-Old-Url;
} else {
  # default parameters, can be overridden per strain
  set req.http.X-Old-Url = req.url;
  set req.url = querystring.regfilter_except(req.url, "^hlx_.*$");
  set req.http.X-Encoded-Params = urlencode(req.url.qs);
  set req.url = req.http.X-Old-Url;
}
