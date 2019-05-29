#
# Copyright 2018 Adobe. All rights reserved.
# This file is licensed to you under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under
# the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
# OF ANY KIND, either express or implied. See the License for the specific language
# governing permissions and limitations under the License.
#


# About URLs and Host headers:
# This VCL will use the following conventions:
# `req.url` - The canonical URL, will be used to determine the hash of the object
# `req.http.X-Orig-URL` - The URL as received from the client
# `req.http.X-Backend-URL` - The URL as should be sent to the origin (backend)
#
# Having `req.url` be canonical, vs `X-Backend-URL` being what's sent to origin 
# allows us to do restarts to find content on other origins, and use origin
# specific URLs, yet have the object stored under a single hash, meaning that 
# a cache lookup will find the proper object on the first attempt once an 
# object is in the cache.
#
# So `req.url` is what should be left after filtering query string parameters,
# doing normalizations, etc. Then `req.http.X-Backend-URL` is a transformation of
# that, using the origin specific rewriting, etc.
#
# Domain names are handled a bit simpler:
# `req.http.Host` - The canonical domain name for the site, used for the hash
# `req.http.X-Orig-Host` - The original domain name from the client
#
# `bereq.http.Host` will be set based on the backend used.
#
# When forwarding the request from edge POP to shield POP, the original URL and
# original domain name will be used.

# VCL extension points
include "extensions.vcl";

/**
 * Check the `X-From-Edge` header, which allows us to determine whether
 * a request is coming from a Fastly edge POP. Use this instead of `Fastly-FF`
 * since that can be spoofed, or come from another Fastly service.
 *
 * This should be called from the very top of `vcl_recv`
 */
sub hlx_check_from_edge {
  # Verify correct format
  if (req.http.X-From-Edge ~ "^(([0-9]+),[^,]+),(0x[0-9a-f]{64})$"
      # Verify the HMAC
      && digest.secure_is_equal(
           # Using existing secret, but adding it to service id
           # TODO: use a separate secret, because changing it can have some
           # gnarly effects, if you don't follow it with a purge all
           digest.hmac_sha256(req.service_id + table.lookup(secrets, "OPENWHISK_AUTH")
           , re.group.1), re.group.3)) {
    declare local var.time TIME;
    set var.time = std.time(re.group.2, std.integer2time(-1));
    # And verify the timestamp is not off by more than 2 seconds
    if (time.is_after(var.time, time.sub(now, 2s))
        && time.is_after(time.add(now, 2s), var.time)) {
      # Do nothing, the header is valid
      return;
    }
  }
  # Header isn't valid, chuck it
  unset req.http.X-From-Edge;
}

/**
 * Set the `X-From-Edge` header that the above sub checks.
 *
 * Should be called from the top of `vcl_miss`/`vcl_pass`
 */
sub hlx_set_from_edge {
  # If it exists, it's legit, leave it alone
  if (!bereq.http.X-From-Edge) {
    declare local var.data STRING;
    set var.data = strftime({"%s"}, now) + "," + server.datacenter;
    set bereq.http.X-From-Edge =
      var.data + "," + digest.hmac_sha256(
        # This must match whatever key is being used 
        req.service_id + table.lookup(secrets, "OPENWHISK_AUTH"), var.data);
  }
}

/**
 * Initial processing of request
 * Does:
 * - Save original URL/Host
 * - Unset headers from client
 * - Setup secure shielding indicator
 */

sub hlx_recv_init {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_recv_init";

  # This is set to true for some cases, but that is not cleared upon a restart
  set req.hash_always_miss = false;

  # Execute the rest only at the very start, not after restarts
  if (req.restarts > 0) {
    return;
  }

  # Check/clear X-From-Edge header
  call hlx_check_from_edge;

  # Set original URL, so that we can log it afterwards.
  set req.http.X-Orig-URL = req.url;
  set req.http.X-Orig-Host = req.http.Host;

  # TODO: Make X-Debug require a valid token
  if (!req.http.X-Debug) {
    # Make sure clients can't change request flow
    # X-Strain is currently settable by Cookie, not worth unsetting for now
    unset req.http.X-Backend-URL;
    unset req.http.X-Dirname;
    unset req.http.X-Request-Type;
    unset req.http.X-Static-Content-Type;
    unset req.http.X-Sticky;
    # Allow through from another Fastly POP as well as from debugger
    if (!req.http.X-From-Edge) {
      unset req.http.X-CDN-Request-ID;
    }
  }

  # Force HTTPS
  if (!req.http.Fastly-SSL) {
     error 801 "Force SSL";
  }

  # Set a unique ID if not present
  if (!req.http.X-CDN-Request-ID) {
    set req.http.X-CDN-Request-ID = randomstr(8, "0123456789abcdef") + "-" + randomstr(4, "0123456789abcdef") + "-4" + randomstr(3, "0123456789abcdef") + "-" + randomstr(1, "89ab") + randomstr(3, "0123456789abcdef") + "-" + randomstr(12, "0123456789abcdef");
  }

  # set X-Version initial value
  set req.http.X-Version = regsub(req.vcl, "([^.]+)\.(\d+)_(\d+)-(.*)", "\2");

}


# Determines the current strain, and sets the X-Strain header
sub hlx_strain {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_strain";
  # TODO: add X-Strain-Key as a random-generated, validation property
  if (req.http.X-Strain) {
    set req.http.X-Trace = req.http.X-Trace + "(header:" + req.http.X-Strain + ")";
  }
  # read strain from URL query string
  if (subfield(req.url.qs, "hlx_strain", "&")) {
    set req.http.X-Strain = subfield(req.url.qs, "hlx_strain", "&");
    set req.http.X-Trace = req.http.X-Trace + "(url)";
  }
  # read strain from Cookie
  if (req.http.Cookie:X-Strain) {
    set req.http.X-Strain = req.http.Cookie:X-Strain;
    set req.http.X-Trace = req.http.X-Trace + "(cookie)";
  }

  # Sanitize user input. `urlencode` leaves alphanumeric and `-._~`
  set req.http.X-Strain = regsuball(urlencode(req.http.X-Strain), {"%.."}, "_");

  # do not override strain if set in header
  if (!req.http.X-Strain||req.http.X-Strain=="") {
    set req.http.X-Strain = "default";

    # run custom strain resolution
    include "strains.vcl";
    set req.http.X-Trace = req.http.X-Trace + "(resolved)";
  }

  # we don't need cookies for anything else, but Proxy strains might
  if (req.http.X-Request-Type != "Proxy") {
    unset req.http.Cookie;
  }
}

# Gets the content whitelist for the current strain and sets the X-Allow header
sub hlx_allow {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_allow";

  # starting permissive – change this for a more restrictive default
  set req.http.X-Allow = table.lookup(strain_allow, req.http.X-Strain);
  if (!req.http.X-Allow) {
    set req.http.X-Allow = table.lookup(strain_allow, "default");
  }
}

# Gets the content blacklist for the current strain and sets the X-Deny header
sub hlx_deny {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deny";

  set req.http.X-Deny = table.lookup(strain_deny, req.http.X-Strain);
  if (!req.http.X-Deny) {
    set req.http.X-Deny = table.lookup(strain_deny, "default");
  }
}

# Implements the content block list (to be called from vcl_recv)
sub hlx_block_recv {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_block_recv";

  call hlx_deny;
  call hlx_allow;
}

# Gets the content owner for the current strain and sets the X-Owner header
sub hlx_owner {
  call hlx_owner_before;

  set req.http.X-Trace = req.http.X-Trace + "; hlx_owner";

  set req.http.X-Owner = table.lookup(strain_owners, req.http.X-Strain);
  if (!req.http.X-Owner) {
    set req.http.X-Owner = table.lookup(strain_owners, "default");
  }

  call hlx_owner_after;
}

# Gets the directory index for the current strain
sub hlx_index {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_index";

  set req.http.X-Index = table.lookup(strain_index_files, req.http.X-Strain);
  if (!req.http.X-Index) {
    set req.http.X-Index = table.lookup(strain_index_files, "default");
  }
}

# Gets the content repo
sub hlx_repo {
  call hlx_repo_before;

  set req.http.X-Trace = req.http.X-Trace + "; hlx_repo";
  set req.http.X-Repo = table.lookup(strain_repos, req.http.X-Strain);
  if (!req.http.X-Repo) {
    set req.http.X-Repo = table.lookup(strain_repos, "default");
  }

  call hlx_repo_after;
}

# Gets the content ref
sub hlx_ref {
  call hlx_ref_before;

  set req.http.X-Trace = req.http.X-Trace + "; hlx_ref";
  set req.http.X-Ref = table.lookup(strain_refs, req.http.X-Strain);
  # fall back to default strain
  if (!req.http.X-Ref) {
    set req.http.X-Ref = table.lookup(strain_refs, "default");
  }
  # if default isn't set, use 'master'
  if (!req.http.X-Ref) {
    set req.http.X-Ref = "master";
  }

  call hlx_ref_after;
}

# Gets the content path root
sub hlx_root_path {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_root_path";
  set req.http.X-Repo-Root-Path = table.lookup(strain_root_paths, req.http.X-Strain);
  if (!req.http.X-Repo-Root-Path) {
    set req.http.X-Repo-Root-Path = table.lookup(strain_root_paths, "default");
  }
  if (!req.http.X-Repo-Root-Path) {
    set req.http.X-Repo-Root-Path = "";
  }
}

sub hlx_action_root {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_action_root";
  set req.http.X-Action-Root = table.lookup(strain_action_roots, req.http.X-Strain);
  if (!req.http.X-Action-Root) {
    set req.http.X-Action-Root = table.lookup(strain_action_roots, "default");
  }
  #set req.http.X-Action-Root = "/trieloff/default/git-github-com-adobe-helix-cli-git--dirty--";
}

# Gets the github static repo
sub hlx_github_static_repo {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_github_static_repo";
  set req.http.X-Github-Static-Repo = table.lookup(strain_github_static_repos, req.http.X-Strain);
  if (!req.http.X-Github-Static-Repo) {
    set req.http.X-Github-Static-Repo = table.lookup(strain_github_static_repos, "default");
  }
}

# Gets the github static owner
sub hlx_github_static_owner {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_github_static_owner";
  set req.http.X-Github-Static-Owner = table.lookup(strain_github_static_owners, req.http.X-Strain);
  if (!req.http.X-Github-Static-Owner) {
    set req.http.X-Github-Static-Owner = table.lookup(strain_github_static_owners, "default");
  }
}

# Gets the github static root
sub hlx_github_static_root {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_github_static_root";
  set req.http.X-Github-Static-Root = table.lookup(strain_github_static_root, req.http.X-Strain);
  if (!req.http.X-Github-Static-Root) {
    set req.http.X-Github-Static-Root = table.lookup(strain_github_static_root, "default");
  }
  if (!req.http.X-Github-Static-Root) {
    set req.http.X-Github-Static-Root = "/";
  }
  set req.http.X-Trace = req.http.X-Trace + "(" + req.http.X-Github-Static-Root +  ")";
}

# Gets the github static ref
sub hlx_github_static_ref {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_github_static_ref";
  set req.http.X-Github-Static-Ref = table.lookup(strain_github_static_refs, req.http.X-Strain);
  if (!req.http.X-Github-Static-Ref) {
    set req.http.X-Github-Static-Ref = table.lookup(strain_github_static_refs, "default");
  }
}

# rewrite required headers (called from fetch)
sub hlx_headers_fetch {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_headers_fetch";

  # Only do this when X-Debug is present, since `Vary: X-Debug` will cause
  # misses, making it useless to keep this on regular objects.
  if (req.http.X-Debug) {
    if (!beresp.http.X-Backend-Name) {
      set beresp.http.X-Backend-Name = beresp.backend.name;
    }
    if (!beresp.http.X-CDN-Request-ID) {
      set beresp.http.X-CDN-Request-ID = req.http.X-CDN-Request-ID;
    }
  }
}

sub hlx_headers_deliver {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_headers_deliver";

  # Set HSTS since we always do HTTPS
  set resp.http.Strict-Transport-Security = "max-age=31536000";

  set resp.http.X-Version = req.http.X-Version;

  if( req.http.X-Debug ) {
    set resp.http.X-URL = req.url;
    set resp.http.X-Orig-Url = req.http.X-Orig-Url;
    set resp.http.X-Backend-URL = req.http.X-Backend-URL;
    set resp.http.X-Request-Type = req.http.X-Request-Type;
    set resp.http.X-Strain = req.http.X-Strain;
    set resp.http.X-Github-Static-Ref = "@" + req.http.X-Github-Static-Ref;

    set resp.http.X-Dirname = req.http.X-Dirname;
    set resp.http.X-FullDirname = req.http.X-FullDirname;
    set resp.http.X-Index = req.http.X-Index;
    set resp.http.X-Action-Root = req.http.X-Action-Root;
    set resp.http.X-Orig-URL = req.http.X-Orig-URL;
    set resp.http.X-Repo-Root-Path = req.http.X-Repo-Root-Path;

    set resp.http.X-Fastly-Imageopto-Api = req.http.X-Fastly-Imageopto-Api;

    set resp.http.X-Embed = req.http.X-Embed;

    set resp.http.X-Trace = req.http.X-Trace;
 }

  call hlx_deliver_errors;
}

sub hlx_determine_request_type {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_determine_request_type";

  if (req.http.X-Request-Type == "Static" && req.url.ext == "url") {
    set req.http.X-Trace = req.http.X-Trace + "(static-url)";
    set req.http.X-Request-Type = "Static-URL";
    return;
  }

  if (req.http.X-Request-Type == "Static" && req.url.ext == "302") {
    set req.http.X-Trace = req.http.X-Trace + "(static-302)";
    set req.http.X-Request-Type = "Static-302";
    return;
  }

  # Exit if we already have a type
  if (req.http.X-Request-Type) {
    set req.http.X-Trace = req.http.X-Trace + "(existing)";
    return;
  }

  if (req.url.ext ~ "^(hlx_([0-9a-f]){20,40}$)") {
    set req.http.X-Trace = req.http.X-Trace + "(immutable)";
    set req.http.X-Request-Type = "Static";
    unset req.http.Accept-Encoding;
    return;
  }

  # TODO:
  # Possibly have a list of extensions that are always static 
  # if (req.url.ext ~ "(?i)^(?:css|js|svg)$") {
  #   set req.http.X-Request-Type = "Static";
  #   return;
  # }
  if (req.http.host == "adobeioruntime.net") {
    set req.http.X-Trace = req.http.X-Trace + "(embed)";
    set req.http.X-Request-Type = "Embed";
    return;
  }
  
  set req.http.X-Trace = req.http.X-Trace + "(none)";
}

/**
 * This subroutine implements static resource prefetching by calling Adobe I/O Runtime
 * @header X-GitHub-Static-Owner  the owner or organization of the repo that contains the source files
 * @header X-GitHub-Static-Repo   the repository name of the repo containing the static files
 * @header X-GitHub-Static-Ref    the branch or tag (or commit) name to serve source files from
 * @header X-Orig-URL             the original (unmodified) URL, starting after hostname and port
 */
sub hlx_type_static_url {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_static_url";

  # get it from OpenWhisk
  set req.backend = F_AdobeRuntime;

  # Only declare local variables for things we mean to change before putting
  # them into the URL
  declare local var.path STRING; # resource path
  declare local var.entry STRING; # bundler entry point

  # Load important information from edge dicts
  call hlx_github_static_owner;
  call hlx_github_static_repo;
  call hlx_github_static_ref;
  call hlx_github_static_root;

  # TODO: check for URL ending with `/` and look up index file
  set var.path = regsub(req.http.X-Orig-URL, ".(url|302)$", "");
  set var.entry = regsub(req.http.X-Orig-URL, ".(url|302)$", "");

  set req.http.X-Action-Root = "/api/v1/web/" + table.lookup(secrets, "OPENWHISK_NAMESPACE") + "/default/hlx--static";
  set req.http.X-Backend-URL = req.http.X-Action-Root
    + "?owner=" + req.http.X-Github-Static-Owner
    + "&repo=" + req.http.X-Github-Static-Repo
    + "&strain=" + req.http.X-Strain
    + "&ref=" + req.http.X-Github-Static-Ref
    + "&entry=" + var.entry
    + "&path=" + var.path
    # TODO: load magic flag
    + "&plain=true"
    + "&allow=" urlencode(req.http.X-Allow)
    + "&deny=" urlencode(req.http.X-Deny)
    + "&root=" + req.http.X-Github-Static-Root;
}

/**
 * This subroutine implements static file handling by calling
 * the hlx--static action in OpenWhisk
 * @header X-GitHub-Static-Owner  the owner or organization of the repo that contains the source files
 * @header X-GitHub-Static-Repo   the repository name of the repo containing the static files
 * @header X-GitHub-Static-Ref    the branch or tag (or commit) name to serve source files from
 * @header X-Orig-URL             the original (unmodified) URL, starting after hostname and port
 */
sub hlx_type_static {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_static";
  # This is a static request.

  # get it from OpenWhisk
  set req.backend = F_AdobeRuntime;

  # Only declare local variables for things we mean to change before putting
  # them into the URL
  declare local var.path STRING; # resource path
  declare local var.entry STRING; # bundler entry point
  declare local var.esi STRING;

  # Load important information from edge dicts
  call hlx_github_static_owner;
  call hlx_github_static_repo;
  call hlx_github_static_ref;
  call hlx_github_static_root;

  
  # check for hard-cached files like /foo.js.hlx_f7c3bc1d808e04732adf679965ccc34ca7ae3441
  if (req.url ~ "^(.*)(.hlx_([0-9a-f]){20,40}$)") {
    set req.http.X-Trace = req.http.X-Trace + "(immutable)";
    # and keep only the non-hashed part, i.e. everything before .hlx_
    set var.path = re.group.1;
    set var.entry = re.group.1;
    set var.esi = "&esi=true";
  } else {
    set req.http.X-Trace = req.http.X-Trace + "(normal)";
    # TODO: check for URL ending with `/` and look up index file
    set var.path = req.url;
    set var.entry = req.url;
    set var.esi = "";
  }
  set var.path = regsuball(var.path, "/+", "/");
  set var.entry = regsuball(var.entry, "/+", "/");

  set req.http.X-Action-Root = "/api/v1/web/" + table.lookup(secrets, "OPENWHISK_NAMESPACE") + "/default/hlx--static";
  set req.http.X-Backend-URL = req.http.X-Action-Root
    + "?owner=" + req.http.X-Github-Static-Owner
    + "&repo=" + req.http.X-Github-Static-Repo
    + "&strain=" + req.http.X-Strain
    + "&ref=" + req.http.X-Github-Static-Ref
    + "&entry=" + var.entry
    + "&path=" + var.path
    + var.esi
    # TODO: load magic flag
    + "&plain=true"
    + "&allow=" urlencode(req.http.X-Allow)
    + "&deny=" urlencode(req.http.X-Deny)
    + "&root=" + req.http.X-Github-Static-Root;

}

/**
 * Handle redirect-serving for static files
 * If the static file is too large for the hlx--static action to serve,
 * because the payload would exceed 1 MB (OpenWhisk limit), the request
 * is restarted, using the `X-Request-Type: Redirect` header, which means the
 * static content will be fetched directly from GitHub, and the required
 * response headers like Content-Type will be injected later on.
 */
sub hlx_type_redirect {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_redirect";
  # Handle a redirect from static.js by
  # - fetching the resource from GitHub
  # - don't forget to override the Content-Type header
  set req.backend = F_GitHub;
  # Replace what we have in the cache already (which is the cached redirect)
  set req.hash_always_miss = true;
}

sub hlx_fetch_static {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_fetch_static";
  declare local var.ext STRING;

  if (req.http.X-Request-Type == "Static-URL" && beresp.status == 200) {
    set req.http.X-Trace = req.http.X-Trace + "(url)";
    # Get the ETag response header and use it to construct a stable URL
    

    set var.ext = ".hlx_" + digest.hash_sha1(beresp.http.ETag);
    set req.http.X-Trace = req.http.X-Trace + "[url=" + req.http.X-Orig-URL + ", ext=" + var.ext + "]";
    set req.http.X-Location = regsub(req.http.X-Orig-URL, ".url$", var.ext);
    error 303 "URL"; 
  }
  if (req.http.X-Request-Type == "Static-302" && beresp.status == 200) {
    set req.http.X-Trace = req.http.X-Trace + "(302)";
    # Get the ETag response header and use it to construct a stable URL
    

    set var.ext = ".hlx_" + digest.hash_sha1(beresp.http.ETag);
    set req.http.X-Trace = req.http.X-Trace + "[url=" + req.http.X-Orig-URL + ", ext=" + var.ext + "]";
    set req.http.X-Location = regsub(req.http.X-Orig-URL, ".302$", var.ext);
    error 902 "302"; 
  }
  # check for hard-cached files like /foo.js.hlx_f7c3bc1d808e04732adf679965ccc34ca7ae3441
  if (req.http.X-Orig-URL ~ "^(.*)(.hlx_([0-9a-f]){20,40}$)") {
    set req.http.X-Trace = req.http.X-Trace + "(immutable)";

    set var.ext = ".hlx_" + digest.hash_sha1(beresp.http.ETag);

    if (re.group.2 == var.ext) {
      set req.esi = true;
      esi;
      set beresp.http.X-ESI = "processed(" + bereq.http.Accept-Encoding + ", " + req.esi + "," + req.http.X-From-Edge +")";
      set beresp.http.x-compress-hint = "on"; // so h2o compresses it on the way out
      set beresp.http.Cache-Control = "max-age=31622400,immutable"; # keep it for a year in the browser;
      set beresp.http.Surrogate-Control = "max-age=31622400,immutable";
      set beresp.cacheable = true;
      set beresp.ttl = 31622400s;
    } else {
      set beresp.ttl = 300s;
      error 404 "Invalid";
      set beresp.http.X-Trace = "etag=" + beresp.http.ETag + "; ext=" + var.ext;

    }
    return(deliver);
  }
  if (beresp.http.X-Static == "Raw/Static") {
    set req.http.X-Trace = req.http.X-Trace + "(raw)";
    if (beresp.status == 307) {
      # Keep the redirect around for a short bit, to prevent thundering herd
      set beresp.cacheable = true;
      set beresp.ttl = 5s;
    }
    return(deliver);
  } elsif (req.http.X-Request-Type == "Redirect" && beresp.status == 200) {
    set req.http.X-Trace = req.http.X-Trace + "(redirect)";
    // and this is where we fix the headers of the GitHub static response
    // so that they become digestible by a browser.
    // - recover Content-Type from X-Content-Type
    // - filter out GitHub-headers

    set beresp.http.Content-Type = req.http.X-Static-Content-Type;
    unset beresp.http.X-Content-Type-Options;
    unset beresp.http.X-Frame-Options;
    unset beresp.http.X-XSS-Protection;
    unset beresp.http.Content-Security-Policy;
  } elsif (beresp.status == 404 || beresp.status == 204) {
    set req.http.X-Trace = req.http.X-Trace + "(400)";
    # Cache for a short time, restart will get rid of it anyway
    set beresp.ttl = 60s;
    return(deliver);
  } else {
    set req.http.X-Trace = req.http.X-Trace + "(none)";
  }
}

/**
 * Fallback handling. Depending on the previous step and the previous status code, either
 * deliver or restart.
 */
sub hlx_deliver_type {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deliver_type";
  if (req.http.X-Request-Type == "Raw") {
    call hlx_deliver_raw;
  } elsif (req.http.X-Request-Type == "Pipeline") {
    call hlx_deliver_pipeline;
  } elsif (req.http.X-Request-Type == "Static") {
    call hlx_deliver_static;
  } elsif ((resp.status == 404 || resp.status == 204) && !req.http.X-Disable-Static && req.restarts < 1 && req.http.X-Request-Type != "Proxy") {
    # That was a miss. Let's try to restart, but only restart once
    set resp.http.X-Status = resp.status + "-Restart " + req.restarts;
    set resp.status = 404;
    
    set req.http.X-Trace = req.http.X-Trace + "(404)";

    if (req.http.X-Request-Type == "Static") {
      set req.http.X-Request-Type = "Dynamic";
    } else {
      set req.http.X-Request-Type = "Static";
    }
    restart;
  }
}

/**
 * Handle the delivery of error handlers. There are two scenarios here:
 * 1. either the error page could be delivered from GitHub, then set the correct status code and deliver it
 * 2. no error page could be found, so set the correct status code and deliver a fallback
 */
sub hlx_fetch_error {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_fetch_error";
  if (resp.status == 200) {
    # TODO: fix headers
  } else {
    error 954 "No error page found";
  }

  if (req.url.basename ~ "^([0-9][0-9][0-9])") {
    set resp.status = re.group.1;
  } else {
    # this should never happen
    set resp.status = 500;
  }
}

/**
 * Handle delivery of static stuff. If there is a 404, restart with error
 * if there is content, just deliver it. If there is a redirect, fetch
 * from redirect and adjust headers
 */
sub hlx_deliver_static {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deliver_static";
  if (resp.status == 200) {
    set req.http.X-Trace = req.http.X-Trace + "(ok)";
    return;
  } elsif (resp.status == 307) {
    # perform some additional validation
    if (resp.http.Location ~ "https://raw.githubusercontent.com(/.*)") {
      set req.http.X-Request-Type = "Redirect";
      set req.http.X-Backend-URL = re.group.1;
      set req.http.X-Static-Content-Type = resp.http.X-Content-Type;
      set req.http.X-Trace = req.http.X-Trace + "(redirect)";
      restart;
    } else {
      set resp.status = 500;
      set resp.response = "Redirect to wrong hostname";
      set req.http.X-Trace = req.http.X-Trace + "(redirect-error)";
    }
  } else {
    # any other error
    set req.http.X-Trace = req.http.X-Trace + "(error)";
    set req.http.X-Request-Type = "Error";
    set req.url = resp.status + "." _ req.url.ext; // fall back to 500.html
    restart;
  }
}

/**
 * Handle delivery of the raw content. If there is content, just deliver as is.
 * If there isn't any content, restart with a pipeline request type.
 */
sub hlx_deliver_raw {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deliver_raw";
  if (resp.status == 200) {
    set req.http.X-Trace = req.http.X-Trace + "(ok)";
    # TODO: fix headers (mime-type, etc.)
  } else {
    set req.http.X-Trace = req.http.X-Trace + "(fallback)";
    set req.http.X-Request-Type = "Pipeline";
    restart;
  }
}

/**
 * Handle delivery of pipeline responses (from OpenWhisk action). If there is content,
 * just deliver as is. If there is a 404, restart with the static request type.
 * If there is any other error, restart with the error request type.
 */
sub hlx_deliver_pipeline {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deliver_pipeline";
  if (resp.status < 400) {
    set req.http.X-Trace = req.http.X-Trace + "(ok)";
    # stuff looks ok, just deliver
    return;
  } elseif (resp.status == 404) {
    set req.http.X-Trace = req.http.X-Trace + "(404)";
    # not found, ergo restart as Static
    set req.http.X-Request-Type = "Static";
    restart;
  } elseif {
    set req.http.X-Trace = req.http.X-Trace + "(error)";
    set req.url = resp.status + "." _ req.url.ext; // fall back to 500.html
    set req.http.X-Request-Type = "Error";
    restart;
  }
}

/**
 * Handle requests to Adobe I/O Runtime services.
 * When Fastly handles ESI requests to 3rd-party domains, they still get routed
 * through this service. In this method we make sure that ESI requests destined
 * for Adobe I/O Runtime, e.g. the helix-embed service are passed through to
 * the correct backend.
 */
sub hlx_type_embed {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_embed";
  # This is an embed request
  # Fastly sends embed requests back to the same service config (which is why
  # we are handling it here), but keeps the correct Host header in place (which
  # is why we can check against it)
  set req.backend = F_AdobeRuntime;
}

/**
 * Handles requests for resources coming straight out of the content repository. This
 * enables image serving, but also custom CSS and JS overrides from the content repo.
 */
sub hlx_type_raw {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_raw";

  set req.backend = F_GitHub;
  # enable shielding, needed for Image Optimization
  if (server.identity !~ "-IAD$" && req.http.Fastly-FF !~ "-IAD") {
    set req.backend = ssl_shield_iad_va_us;
  }
  if (!req.backend.healthy) {
    # the shield datacenter is broken so dont go to it
    set req.backend = F_GitHub;
  }

  # Load important information from edge dicts
  call hlx_owner;
  call hlx_repo;
  call hlx_ref;
  call hlx_root_path;

  declare local var.dir STRING; # directory name
  declare local var.path STRING; # full path
  if (req.http.X-Dirname) {
    # set root path based on strain-specific dirname (strips away strain root)
    set var.dir = req.http.X-Root-Path + req.http.X-Dirname;
  } else {
    set var.dir = req.http.X-Root-Path + req.url.dirname;
  }
  set var.dir = regsuball(var.dir, "/+", "/");

  set var.path = var.dir + "/" + req.url.basename;
  set var.path = regsuball(var.path, "/+", "/");
  set req.http.X-Backend-URL = "/" + req.http.X-Owner
     + "/" + req.http.X-Repo
     + "/" + req.http.X-Ref
     + var.path + "?" + req.url.qs;

  # enable IO for image file-types
  if (req.url.ext ~ "(?i)^(gif|png|jpe?g|webp)$") {
    set req.http.X-Trace = req.http.X-Trace + "(image-opti))";
    set req.http.X-Fastly-Imageopto-Api = "fastly";
  }
}

/**
 * Fetches a file like /404.html from the content repo.
 */
sub hlx_type_error {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_error";

  # delegate to the normal "Raw" handler, as this does exactly what we need
  call hlx_type_raw;
}

/**
 * Handles requests for the main Helix rendering pipeline.
 */
sub hlx_type_pipeline {
  call hlx_type_pipeline_before;

  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_pipeline";
  # This is a dynamic request.

  # get it from OpenWhisk
  set req.backend = F_AdobeRuntime;

  # Only declare local variables for things we mean to change before putting
  # them into the URL
  declare local var.dir STRING; # the directory of the content
  declare local var.name STRING; # the name (without extension) of the resource
  declare local var.selector STRING; # the selector (between name and extension)
  declare local var.extension STRING;
  declare local var.action STRING; # the action to call
  declare local var.path STRING; # resource path
  declare local var.entry STRING; # bundler entry point
  declare local var.rootPath STRING; # the root-path (aka mount point) of a strain

  set var.rootPath = req.http.X-Root-Path;

  # Load important information from edge dicts
  call hlx_owner;
  call hlx_repo;
  call hlx_ref;
  call hlx_root_path;

  if (req.http.X-Dirname) {
    # set root path based on strain-specific dirname (strips away strain root)
    set var.dir = req.http.X-Repo-Root-Path + req.http.X-Dirname;
  } else {
    set var.dir = req.http.X-Repo-Root-Path + req.url.dirname;
  }
  set var.dir = regsuball(var.dir, "/+", "/");

  # repeat the regex in case another re-function has been called in the meantime
  if (req.url.basename ~ "(^[^\.]+)(\.?(.+))?(\.[^\.]*$)") {
    set var.name = re.group.1;
    set var.selector = re.group.3;
    set var.extension = req.url.ext;
  } else {
    call hlx_index;
    # enable ESI
    set req.http.x-esi = "1";
    if (req.http.X-Index ~ "(^[^\.]+)\.?(.*)\.([^\.]+$)") {
      # determine directory index from strain config
      set var.name = re.group.1;
      set var.selector = re.group.2;
      set var.extension = re.group.3;
    } else {
      # force default directory index
      set req.http.X-Index = "default";
      set var.name = "index";
      set var.selector = "";
      set var.extension = "html";
    }
  }

  call hlx_action_root;

  if (std.strlen(var.selector) > 0) {
    set var.action = "/" + req.http.X-Action-Root + "/" + var.selector + "_" + var.extension;
  } else {
    set var.action = "/" + req.http.X-Action-Root + "/" + var.extension;
  }

  # get (strain-specific) parameter whitelist
  include "params.vcl";

  set var.path = var.dir + "/" + var.name + ".md";
  set var.path = regsuball(var.path, "/+", "/");
  # Invoke OpenWhisk
  set req.http.X-Backend-URL = "/api/v1/web" + var.action
    + "?owner=" + req.http.X-Owner
    + "&repo=" + req.http.X-Repo
    + "&ref=" + req.http.X-Ref
    + "&path=" + var.path
    + "&selector=" + var.selector
    + "&extension=" + req.url.ext
    + "&strain=" + req.http.X-Strain
    + "&rootPath=" + var.rootPath;

  # only append the encoded params if there are encoded params
  if (req.http.X-Encoded-Params) {
    set req.http.X-Backend-URL = req.http.X-Backend-URL
      + "&params=" + req.http.X-Encoded-Params;
  }

  call hlx_type_pipeline_after;
}

/**
 * Handle requests to Proxy Strains.
 * These requests already have a backend set as part of the strain resolution
 * so there is no need for URL rewriting.
 */
sub hlx_type_proxy {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_type_proxy";
  # TODO: set Forwarded header? (RFC7239)
  # TODO: Host header/URL rewrites? or all done at strain resolution time?

  # Pass here so that `dynamic.vcl` doesn't execute for Proxy requests
  # And we do a pass, not a lookup, because caching third parties is way too
  # risky, and would take a lot of work in `vcl_fetch` to get right.
  return(pass);
}

/**
 * This is where all requests are received.
 */
sub vcl_recv {
  if (req.restarts == 0) {
    if (req.http.X-Trace) {
      set req.http.X-Trace = req.http.X-Trace + "; vcl_recv";
    } else {
      set req.http.X-Trace = "vcl_recv";
    }
  } else {
    # So we don't have to add `RESTART` to `X-Trace` whenever we use `restart`
    set req.http.X-Trace = req.http.X-Trace + "; RESTART; vcl_recv";
  }

  call hlx_recv_init;

#FASTLY recv

  # X-Location gets set by Helix's redirect logic inside the FASTLY recv block
  # that will get injected above.
  if (req.http.X-Location) {
    error 301 "Redirect";
  }

  # TODO: Do we even want to set a regular origin as default? Possibly set one
  # that acts as a canary. If requests reach it, the VCL isn't setting a backend
  # somewhere.
  set req.backend = F_AdobeRuntime;
  
  if (req.http.X-From-Edge) {
    # Request came from a Fastly POP, send the raw response without ESI processing
    set req.esi = false;
  } elseif ( req.url.ext == "html" ) {
    set req.http.x-esi = "1";
  }

  // compute X-FullDirname which contains the real incoming path of directories
  if (req.url.ext == "") {
    // case url = /a/b -> for Fastly, dirname = /a and basename = b
    set req.http.X-FullDirname = req.url.dirname + "/" + req.url.basename;
  } else {
    // case url = /a/b/c.html -> for Fastly, dirname = /a/b which is what we need
    set req.http.X-FullDirname = req.url.dirname;
  }
  // remove potential double slashes
  set req.http.X-FullDirname = regsuball(req.http.X-FullDirname, "/+", "/");

  # Determine the current strain and execute strain-specific code
  call hlx_strain;

  # block bad requests – needs current strain and unchanged req.url
  call hlx_block_recv;

  # Must be after `hlx_strain`, because that might set `Proxy` as type
  call hlx_determine_request_type;

  # Force clustering (despite the name of the header) to make sure we get good
  # cache efficiency with restarts. Without this, Fastly clustering would be
  # disabled after a restart, which means that each node in a Fastly POP would
  # use its own cache, instead of checking the designated node for the object. 
  set req.http.Fastly-Force-Shield = "yes";

  if (req.http.X-Request-Type == "Proxy") {
    call hlx_type_proxy;
  } elsif (req.http.X-Request-Type == "Static") {
    call hlx_type_static;
  } elsif (req.http.X-Request-Type == "Redirect") {
    call hlx_type_redirect;
  } elsif (req.http.X-Request-Type == "Embed") { 
    call hlx_type_embed;
  } elseif (req.http.X-Request-Type == "Static-URL") {
    call hlx_type_static_url;
  } elseif (req.http.X-Request-Type == "Static-302") {
    call hlx_type_static_url;
  } elseif (req.http.X-Request-Type == "Pipeline") {
    call hlx_type_pipeline;
  } elseif (req.http.X-Request-Type == "Error") {
    call hlx_type_error;
  } else {
    set req.http.X-Request-Type = "Raw";
    call ;
  }

  # run generated vcl
  include "dynamic.vcl";

  # re-enable shielding for changed backends
  # include "reset.vcl";

  # We only handle GET and HEAD requests, but Proxy strains might
  if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
    error 405;
  }

  return(lookup);
}

sub hlx_fetch_errors {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_fetch_errors";
  # Interpreting OpenWhisk errors is a bit tricky, because we don't have access to the JSON
  # of the response body. Instead we are using the Content-Length of known error messages
  # to determine the most likely root cause. Each root cause will get an internal status code
  # starting with 951, which is then handled by `hlx_error_errors` and `hlx_deliver_errors`
  if ( beresp.status == 404 && beresp.http.Content-Type=="application/json" && beresp.http.Content-Length=="74" ) {
      # ResponseObject: Unknown Extension
      error 951 "Unknown Extension";
  }

  if ( beresp.status == 404 && beresp.http.Content-Type=="application/json" && beresp.http.Content-Length=="69" ) {
      # ResponseObject: Unknown Extension
      error 952 "Wrong Code Path";
  }

  if ( beresp.status == 401 && beresp.http.Content-Type=="application/json" && beresp.http.Content-Length=="65" ) {
      # ResponseObject: Unknown Extension
      error 953 "Can't Call Action";
  }
}

sub hlx_deliver_errors {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_deliver_errors";

  # Cache Condition: OpenWhisk Error Prio: 10
  if (resp.status == 951 ) {
     set resp.status = 404;
     set resp.response = "Not Found";
  }
  if (resp.status == 952 ) {
     set resp.status = 500;
     set resp.response = "Internal Server Error";
  }
  if (resp.status == 953 ) {
     set resp.status = 500;
     set resp.response = "Internal Server Error";
  }
  if (resp.status == 954) {
    if (req.url.basename ~ "^([0-9][0-9][0-9])") {
      set resp.status = re.group.1;
    } else {
      # this should never happen
      set resp.status = 500;
    }
  }
}

sub hlx_error_errors {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_error_errors";
  # Cache Condition: OpenWhisk Error Prio: 10
  if (obj.status == 951 ) {
    set obj.http.Content-Type = "text/html";
    synthetic {"include:951.html"};
    return(deliver);
  }
  if (obj.status == 952 ) {
    set obj.http.Content-Type = "text/html";
    synthetic {"include:952.html"};
    return(deliver);
  }
  if (obj.status == 953 ) {
    set obj.http.Content-Type = "text/html";
    synthetic {"include:953.html"};
    return(deliver);
  }
  if (obj.status == 954) {
    set obj.http.Content-Type = "text/html";
    if (req.url.basename ~ "^404") {
      synthetic {"include:404.html"};
      return(deliver);
    }
    if (req.url.basename ~ "^500") {
      synthetic {"include:500.html"};
      return(deliver);
    }
    synthetic {"include:generic-error.html"};
    return(deliver);
  }
}

sub vcl_fetch {
  # store trace information in backend response headers in order 
  # to make them available in vcl_deliver
  set beresp.http.X-Trace = req.http.X-Trace;
  set beresp.http.X-PreFetch-Pass = req.http.X-PreFetch-Pass;
  set beresp.http.X-PreFetch-Miss = req.http.X-PreFetch-Miss;
  set beresp.http.X-PostFetch = "; vcl_fetch(" beresp.status ": " req.url ")";
#FASTLY fetch

  # Sprinkling in our debugging
  call hlx_headers_fetch;

  # Don't try to do anything else with Proxy requests
  if (req.http.X-Request-Type == "Proxy") {
    return(pass);
  }

  call hlx_fetch_errors;

  unset beresp.http.Set-Cookie;
  unset beresp.http.Vary;
  unset beresp.http.Expires;

  # We Vary on X-Debug, so that it's automatically a cache-miss, and we go to
  # origin. Origin will raise the log level for such requests too. So all roung
  # convenience.
  if (beresp.http.Vary !~ "X-Debug") {
    if (beresp.http.Vary) {
      set beresp.http.Vary = beresp.http.Vary + ",X-Debug";
    } else {
      set beresp.http.Vary = "X-Debug";
    }
  }
  # Vary on Strain for pipeline and static, since we're sending strain in the 
  # backend URL.
  if (beresp.http.Vary !~ "X-Strain") {
    # Vary is already set above
    set beresp.http.Vary = beresp.http.Vary + ",X-Strain";
  }

  # Vary on Request-Type, so that static requests don't interfere with
  # dynamic requests: https://github.com/adobe/helix-publish/issues/45
  if (beresp.http.Vary !~ "X-Request-Type") {
    set beresp.http.Vary = beresp.http.Vary + ",X-Request-Type";
  }

  # TODO: Add Surrogate-Keys, based on req.url/X-Orig-URL

  if (beresp.http.Expires || beresp.http.Surrogate-Control ~ "max-age" || beresp.http.Cache-Control ~ "(s-maxage|max-age)") {
    # Use TTL from origin
  } else {
    # apply a default ttl
    if (beresp.status == 200) {
      set beresp.ttl = 604800s;
      set beresp.http.Cache-Control = "max-age=604800, public";
    } else {
      set beresp.ttl = 60s;
    }
  }

  if (req.http.X-Request-Type == "Error") {
    # check the response from /404.html, /500.html, etc.
    call hlx_fetch_error;
  }
  call hlx_fetch_static;

  if (beresp.http.X-ESI == "enabled" || req.http.x-esi) {
    esi;
  }

  return(deliver);
}

sub vcl_hash {
  set req.http.X-Trace = req.http.X-Trace "; vcl_hash(" req.http.host req.url ")";
#FASTLY hash
}

sub vcl_hit {
  set req.http.X-Trace = req.http.X-Trace + "; vcl_hit(" req.url ")";
#FASTLY hit

  if (!obj.cacheable) {
    return(pass);
  }
  return(deliver);
}

/**
 * Do all BackEnd REQuest changes. One sub to be called from both vcl_miss and
 * vcl_pass, to avoid code-rot through having to update two places.
 */
sub hlx_bereq {
  set req.http.X-Trace = req.http.X-Trace + "; hlx_bereq";

  # If we're going to a shield (another Fastly POP) use the original URL and
  # Host header. If not a shield, we're going to origin; set the URL and Host
  # header as explained at the top of this file.
  if (req.backend.is_shield) {
    set bereq.url = req.http.X-Orig-Url;
    set bereq.http.Host = req.http.X-Orig-Host;
  } else {
    if (req.http.X-Backend-URL) {
      set bereq.url = req.http.X-Backend-URL;
    }
    if (req.backend == F_AdobeRuntime) {
      set bereq.http.Host = "adobeioruntime.net";
    } elsif (req.backend == F_GitHub) {
      set bereq.http.Host = "raw.githubusercontent.com";
    }
  }

  
  if (req.backend == F_AdobeRuntime) {
    # set backend authentication
    set bereq.http.Authorization = table.lookup(secrets, "OPENWHISK_AUTH");
  }

  # making sure to get an uncompressed object for ESI
  unset bereq.http.Accept-Encoding;

  # Clean up all temporary request headers, since origins might be 3rd parties
  unset bereq.http.X-Orig-Url;
  unset bereq.http.X-Orig-Host;
  unset bereq.http.X-Backend-URL;
  unset bereq.http.X-Request-Type;
  unset bereq.http.X-Static-Content-Type;
  unset bereq.http.X-Allow;
  unset bereq.http.X-Deny;
  unset bereq.http.X-Owner;
  unset bereq.http.X-Index;
  unset bereq.http.X-Repo;
  unset bereq.http.X-Ref;
  unset bereq.http.X-Root-Path;
  unset bereq.http.X-Action-Root;
  unset bereq.http.X-Github-Static-Repo;
  unset bereq.http.X-Github-Static-Owner;
  unset bereq.http.X-Github-Static-Root;
  unset bereq.http.X-Github-Static-Ref;

}

sub vcl_miss {
  set req.http.X-PreFetch-Miss = ",vcl_miss(" bereq.http.host bereq.url ")";
#FASTLY miss

  call hlx_set_from_edge;

  call hlx_bereq;

  return(fetch);
}

sub vcl_pass {
  set req.http.X-PreFetch-Pass = "; vcl_pass";
#FASTLY pass

  call hlx_set_from_edge;

  call hlx_bereq;

  return(pass);
}

sub vcl_deliver {
  # reconstruct VCL trace from information stored in backend response headers
  if (resp.http.X-Trace) {
    set req.http.X-Trace = resp.http.X-Trace;
  }

  if (fastly_info.state ~ "^HITPASS") {
    set req.http.X-Trace = req.http.X-Trace "; vcl_hit(object: uncacheable, return: pass)";
  } elseif (fastly_info.state ~ "^HIT") {
    set req.http.X-Trace= req.http.X-Trace "; vcl_hit(" req.http.host req.url ")";
  } else {
    if (resp.http.X-PreFetch-Pass) {
      set req.http.X-Trace = req.http.X-Trace resp.http.X-PreFetch-Pass;
      unset resp.http.X-PreFetch-Pass;
    }

    if (resp.http.X-PreFetch-Miss) {
      set req.http.X-Trace = req.http.X-Trace resp.http.X-PreFetch-Miss;
      unset resp.http.X-PreFetch-Miss;
    }

    if (resp.http.X-PostFetch) {
      set req.http.X-Trace = req.http.X-Trace resp.http.X-PostFetch;
      unset resp.http.X-PostFetch;
    }
  }

  set req.http.X-Trace = req.http.X-Trace + "; vcl_deliver";
#FASTLY deliver

  call hlx_headers_deliver;

  call hlx_deliver_type;

  # only set the strain cookie for sticky strains
  # and only do it for the Adobe I/O Runtime backend
  # Proxy strains can't be sticky, because resolution sets backend and what not,
  # so skipping resolution would skip that too.
  if (req.http.X-Strain && req.http.X-Sticky == "true"
      && req.backend == F_AdobeRuntime && req.http.X-Request-Type != "Proxy") {
    set resp.http.Set-Cookie = "X-Strain=" + req.http.X-Strain + "; Secure; HttpOnly; SameSite=Strict;";
  }

  if (!req.http.X-Debug) {
    # Unless we are debugging, shut up chatty headers
    unset resp.http.Access-Control-Allow-Headers;
    unset resp.http.Access-Control-Allow-Methods;
    unset resp.http.Access-Control-Allow-Origin;
    unset resp.http.Perf-Br-Resp-Out;
    unset resp.http.Server;
    unset resp.http.Via;
    unset resp.http.X-Backend-Name;
    unset resp.http.X-Backend-URL;
    unset resp.http.X-Cache-Hits;
    unset resp.http.X-Cache;
    unset resp.http.X-CDN-Request-ID;
    unset resp.http.X-Content-Type-Options;
    unset resp.http.X-Content-Type;
    unset resp.http.X-Fastly-Request-ID;
    unset resp.http.X-Frame-Options;
    unset resp.http.X-FullDirname;
    unset resp.http.X-Geo-Block-List;
    unset resp.http.X-GitHub-Request-Id;
    unset resp.http.X-GW-Cache;
    unset resp.http.x-openwhisk-activation-id;
    unset resp.http.X-Request-Id;
    unset resp.http.X-Served-By;
    unset resp.http.X-Static;
    unset resp.http.X-Sticky;
    unset resp.http.X-Strain;
    unset resp.http.X-Timer;
    unset resp.http.X-URL;
    unset resp.http.x-xss-protection;
  } else {
    set resp.http.X-Trace = req.http.X-Trace;
  }
  return(deliver);
}

sub vcl_error {
  set req.http.X-Trace = req.http.X-Trace + "; vcl_error";
#FASTLY error

  if (obj.status == 301 && req.http.X-Location) {
    set obj.http.Content-Type = "text/html";
    set obj.http.Location = req.http.X-Location;
    synthetic "Moved permanently <a href='" + req.http.X-Location+ "'>" + req.http.X-Location + "</a>";
    return(deliver);
  }
  # synthetic response for Static-URL: creates a plain text response with the immutable URL
  if (obj.status == 303 && req.http.X-Location) {
    set obj.http.Content-Type = "text/plain";
    set obj.status = 200;
    synthetic req.http.X-Location;
    return(deliver);
  }
  # synthetic response for Static-302: creates a redirect to the immutable URL
  if (obj.status == 902 && req.http.X-Location) {
    set obj.http.Content-Type = "text/html";
    set obj.status = 302;
    set obj.http.Location = req.http.X-Location;
    synthetic "Found: <a href='" + req.http.X-Location+ "'>" + req.http.X-Location + "</a>";
    return(deliver);
  }
  call hlx_error_errors;
}

sub vcl_log {
#FASTLY log
}
