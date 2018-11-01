const connect = require('connect');
const serve_static = require("serve-static");
const http = require('http');
const app = connect()
    .use(serve_static('public'))

http.createServer(app).listen(8080);
