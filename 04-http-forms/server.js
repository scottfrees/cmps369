/* 
-----------------------------------------------------------------------------------

	IMPORTANT
	===========
	Before running this program, you need to install the "connect"
	package into this directory.

	From the command line, while in the same directory as this file, 
	type "npm install".

	Then to run, just type "node server.js"

----------------------------------------------------------------------------------- 
*/



const connect = require("connect");
const logger = require("morgan");
const serve_static = require("serve-static");
const http = require("http");
const url = require('url');
const qs = require('querystring');

const serve = (req, res) => {
    console.log("Host name:  " + req.headers.host);
    console.log("Connection:  " + req.headers.connection);
    console.log("Accept:  " + req.headers.accept);

    if (req.method == 'POST') {
        process_post(req, res);
    }
    else {
        process_get(req, res);
    }
}

const process_post = (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let response = "<html><body><h1>Posted data</h1>";
        const post = qs.parse(body);
        for (const q in post) {
            console.log(q + " -> " + post[q]);
            response += ("<p> " + q + "->" + post[q] + "</p>");
        }
        response += "</body></html>";
        res.end(response);
    });
}

const process_get = (req, res) => {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    for (const q in query) {
        console.log(q + " -> " + query[q]);
    }
    res.end('That page wasn\'t found...\n');
}


const app = connect()
    .use(logger('dev'))
    .use(serve_static('public'))
    .use(serve)

http.createServer(app).listen(8080);
