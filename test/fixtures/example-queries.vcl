if (req.url.path == "/_query/blog-posts/fresh") {
  set req.http.X-Surrogate-Control = "max-age=0";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "blog-posts" # from the index name
   + "?query=" + "*"
   + "&filters=" + ""
   + "&facets=" + ""
   + "&page=" + regsub(querystring.filter_except(req.url, "page"), "^.*=", "");
   + "&hitsPerPage=25";
}
if (req.url.path == "/_query/blog-posts/all") {
  set req.http.X-Surrogate-Control = "max-age=600";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "blog-posts" # from the index name
   + "?query=" + "*"
   + "&filters=" + ""
   + "&facets=" + ""
   + "&page=" + regsub(querystring.filter_except(req.url, "page"), "^.*=", "");
   + "&hitsPerPage=25";
}
if (req.url.path == "/_query/blog-posts/by-author") {
  set req.http.X-Surrogate-Control = "max-age=300";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "blog-posts" # from the index name
   + "?query=" + "*"
   + "&filters=" + "author%3A" + regsub(querystring.filter_except(req.url, "author"), "^.*=", "") + "%0A"
   + "&facets=" + ""
   + "&page=" + regsub(querystring.filter_except(req.url, "page"), "^.*=", "");
   + "&hitsPerPage=25";
}