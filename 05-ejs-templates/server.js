
/* Before attempting to run this, 
   type "npm install" at the command line
   to install the dependencies listed in 
   the package.json file
*/

const connect = require("connect"); // external dependency - middleware
const logger = require("morgan"); // external dependency - logging middleware
const serve_static = require("serve-static"); // external dependency - serving static files
const ejs = require('ejs');  // external dependency - templating engine

const http = require("http"); // built into node.
const qs = require('querystring');// built into node.

const serve = (req, res) => {
    if(req.method=='POST')  {
        let body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function() {
            // remember - post is just an array of name/value pairs now...
            // since it's been parsed.
            const post =  qs.parse(body);
            // Notice that this is an asynchronous call - the 
            // third parameter is a callabck function that receives
            // an error (if present) and the resulting HTML string.
            ejs.renderFile("received.ejs",{"post": post},
                function(err, result) {
                    if (!err) {
                        res.end(result);
                    }
                    else {
                        res.end("An error occurred");
                    }
                }
            );
        });
    }
    else {
        // This will happen only when a GET is issued, and the resource
        // is not found in the public directory.
        // For example, most browses will ask for a favicon.ico - which we 
        // do not have.
        res.writeHead(401, {'Content-Type': 'text/html'});
        res.end("Not found!");
    }
}


// While we will use the querystring module here, 
// you should check out body-parser
// which provides simplified body parsing via connect.  
// We will switch over to body-parser soon

var app = connect()
    .use (logger('dev'))
    .use (serve_static('public'))
    .use (serve);

http.createServer(app).listen(8080);