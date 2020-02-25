# This file resets shielding for all known backends
if (req.backend == F_GitHub && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = F_GitHub;
  }
}
if (req.backend == F_AdobeRuntime && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = F_AdobeRuntime;
  }
}
if (req.backend == F_AdobeFonts && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = F_AdobeFonts;
  }
}
if (req.backend == F_AzureBlobs && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = F_AzureBlobs;
  }
}
if (req.backend == F_Proxywwwadobeio3a0a && req.restarts == 0) {
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    set req.backend = F_Proxywwwadobeio3a0a;
  }
}