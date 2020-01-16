if (req.url.path == "/_query/blog-posts/by-author") {
  set req.http.X-Surrogate-Control = "max-age=300";
  set req.http.X-Backend-URL = "/1/indexes/"
   + req.http.X-Owner + "--"
   + req.http.X-Repo + "--"
   + "blog-posts" # from the index name
   + "?query=*"
   + "&filters="
   + "&facets=";
}