// first i make the server because idk that's where it all starts **~*~*~*~

var http = require('http');
var url = require('url');
var port = process.env.PORT || 8888;

function serve(handleRoute, route) {
  http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var postData = "";
    req.setEncoding("utf8");
    req.addListener("data", function(d) {
      postData += d;
    });
    req.addListener("end", function() {
      console.log("data is", postData);
      route(handleRoute, pathname, res, postData);
    });

  }).listen(port);
}

exports.serve = serve;
