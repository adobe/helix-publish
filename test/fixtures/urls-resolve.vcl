# This file handles the strain resolution
if (req.http.Host == "www.project-helix.io" && (req.url.dirname ~ "^/client$" || req.url.dirname ~ "^/client/")) {
  set req.http.X-Dirname = regsub(req.url.dirname, "^/client", "");
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "client";
} else if (req.http.Host == "www.project-helix.io" && (req.url.dirname ~ "^/pipeline$" || req.url.dirname ~ "^/pipeline/")) {
  set req.http.X-Dirname = regsub(req.url.dirname, "^/pipeline", "");
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "pipeline";
} else if (req.http.Host == "proxy.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "https://www.adobe.io:443/";
  set req.http.X-Static = "Proxy";
  
  set req.backend = F_Proxywwwadobeio861b;
  set req.http.host = "www.adobe.io";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy";
} else {
  set req.http.X-Strain = "default";
}