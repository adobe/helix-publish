# This file handles the strain resolution
set req.http.X-Root-Path = "";
if (req.http.Host == "www.project-helix.io" && (req.http.X-FullDirname ~ "^/client$" || req.http.X-FullDirname ~ "^/client/")) {
  set req.http.X-Dirname = regsub(req.http.X-FullDirname, "^/client", "");
  set req.http.X-Root-Path = "/client";
  # Rewrite the URL to include the proxy path
  set req.url = regsub(req.url, "^/client", "/");
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "client";
} else if (req.http.Host == "www.project-helix.io" && (req.http.X-FullDirname ~ "^/pipeline$" || req.http.X-FullDirname ~ "^/pipeline/")) {
  set req.http.X-Dirname = regsub(req.http.X-FullDirname, "^/pipeline", "");
  set req.http.X-Root-Path = "/pipeline";
  # Rewrite the URL to include the proxy path
  set req.url = regsub(req.url, "^/pipeline", "/");
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "pipeline";
} else if (req.http.Host == "proxy.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "https://www.adobe.io:443/";
  set req.http.X-Proxy-Root = "/";
  set req.http.X-Request-Type = "Proxy";
  
  set req.backend = F_Proxywwwadobeio861b;
  set req.http.host = "www.adobe.io";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy";
} else {
  set req.http.X-Strain = "default";
}