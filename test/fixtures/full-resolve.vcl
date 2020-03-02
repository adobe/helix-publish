# This file handles the strain resolution
set req.http.X-Root-Path = "";
if (req.http.Host == "client.project-helix.io") {
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "client";
} else if (req.http.host == "pipeline.project-helix.io") {
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "pipeline";
} else if (req.http.host == "proxy.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "https://www.adobe.io:443/";
  set req.http.X-Proxy-Root = "/";
  set req.http.X-Request-Type = "Proxy";
  
  set req.backend = F_Proxywwwadobeio3a0a;
  set req.http.host = "www.adobe.io";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy";
} else if (req.http.host == "proxy2.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "http://192.168.0.1:80/";
  set req.http.X-Proxy-Root = "/";
  set req.http.X-Request-Type = "Proxy";
  
  set req.backend = F_publish;
  set req.http.host = "192.168.0.1";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy-detailed";
} else if (req.http.Host == "developer.adobe.com" && (req.http.X-FullDirname ~ "^/olddir$" || req.http.X-FullDirname ~ "^/olddir/")) {
  set req.http.X-Dirname = regsub(req.http.X-FullDirname, "^/olddir", "");
  set req.http.X-Root-Path = "/olddir";
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "https://www.adobe.io:443/";
  set req.http.X-Proxy-Root = "/newdir";
  set req.http.X-Request-Type = "Proxy";
  
  set req.backend = F_Proxywwwadobeio3a0a;
  set req.http.host = "www.adobe.io";
  
  # Rewrite the URL to include the proxy path
  set req.url = regsub(req.url, "^/olddir", "/newdir");
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "proxy-path";
} else {
  set req.http.X-Strain = "default";
}