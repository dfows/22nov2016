var server = require('./server');
var router = require('./router');
var reqHandler = require('./reqHandler');

var handleRoute = {};
handleRoute['/'] = reqHandler.home;
handleRoute['/new'] = reqHandler.newP;
handleRoute['/submit'] = reqHandler.submit;

server.serve(handleRoute, router.route);
