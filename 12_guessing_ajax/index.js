const connect = require('connect');
const serve_static = require("serve-static");
const http = require('http');

// Cookies and sessions are back, because
// state is returning to the server.
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const ex_session = require('express-session');

const init = (req) => {
    const value = Math.floor((Math.random() * 10) + 1);
    req.session.value = value;
}

// Serve never creates HTML, just responds to AJAX calls.
// The result of calling /start and /guess (via POST) is
// a 200 response with a JSON payload - that the client
// uses.
const serve = (req, res) => {
    console.log(req.url + " has been requested");

    // The client code posts to start when a new 
    // game state is being requested.
    if (req.url == "/start") {
        init(req);
        // There is not much to respond with - we've initialized
        // this session's game state.
        res.writeHead(200, { 'Content-Type': 'application/text' });
        res.end();
    }

    // The client code posts to guess when the user enters
    // a new guess.
    else if (req.url == "/guess") {
        const value = req.session.value;
        const guess = req.body.guess;
        console.log(value + ' <> ' + guess);
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (guess == value) {
            res.end(JSON.stringify({ result: 'success' }));
            // Re-initialize the game.
            init(req);
        }
        else if (guess < value) {
            res.end(JSON.stringify({ result: 'low' }));
        }
        else {
            res.end(JSON.stringify({ result: 'high' }));
        }
    }

}

const app = connect()
    .use(cookieparser())
    .use(ex_session({ secret: 'cmps369' }))
    .use(bodyparser())
    .use(serve_static('public')) // All HTML is just in Public
    .use(serve);
http.createServer(app).listen(8090);
