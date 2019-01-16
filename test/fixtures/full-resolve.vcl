# This file handles the strain resolution
if (req.http.Host == "client.project-helix.io") {
  set req.http.X-Sticky = "false";
  set req.http.X-Strain = "client";
} else if (req.http.host == "pipeline.project-helix.io") {
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "pipeline";
} else if (req.http.host == "proxy.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "https://www.adobe.io:443/";
  set req.http.X-Static = "Proxy";
  
  set req.backend = F_Proxywwwadobeio861b;
  set req.http.host = "www.adobe.io";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy";
} else if (req.http.host == "proxy2.project-helix.io") {
  
  # Enable passing through of requests
  
  set req.http.X-Proxy = "http://192.168.0.1:80/";
  set req.http.X-Static = "Proxy";
  
  set req.backend = F_publish;
  set req.http.host = "192.168.0.1";
  
  set req.http.X-Sticky = "true";
  set req.http.X-Strain = "proxy-detailed";
} else {
  set req.http.X-Strain = "default";
}