// now for routing

function route(handleRoute, pathname, res, data) {
  if (!handleRoute[pathname]) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 no path");
    res.end();
  } else {
    handleRoute[pathname](res, data);
  }
}

exports.route = route;
