const connect = require('connect');
const logger = require("morgan");
const serve_static = require("serve-static");
const http = require('http');
const ejs = require('ejs');
const bodyparse = require('body-parser');
const cookieparser = require('cookie-parser');
const ex_session = require('express-session');


const get_start_page = (req, res) => {
    // The start page is rendered with a newly
    // generated secret value, which is passed
    // to the ejs renderer via the model.
    // In this example, we place the secret 
    // number in the actual HTML as a hidden form field.

    const value = Math.floor((Math.random() * 10) + 1);
    console.log(`The secret number is ${value}`);

    // Store the value in the session (server-side), 
    // along with initializing a list of results.
    req.session.value = value;
    req.session.results = [];

    // This is a custom function, which looks up the 
    // ejs file start.ejs in the template directory.
    // We re-use this in the other routes as well.
    render(res, "start", {});
}

const check_guess_and_diplay = (req, res) => {
    // The secret number is in the session..
    const value = req.session.value;

    const guess = req.body.guess;
    if (guess == value) {
        render(res, "success", {});
    }
    else if (guess < value) {
        req.session.results.push({ guess: guess, result: "too low" });
        render(res, "guess", { results: req.session.results });
    }
    else {
        req.session.results.push({ guess: guess, result: "too high" });
        render(res, "guess", { results: req.session.results });
    }
}

const serve = (req, res) => {
    // We are now using a really simple form of routing to 
    // execute specific functions in response to specific
    // urls.  In this particular example, we do not care
    // about method (get/post).
    if (req.url == '/start') {
        get_start_page(req, res)
    }
    else if (req.url == '/guess') {
        check_guess_and_diplay(req, res);
    }
    else {
        res.end("Page not found!");
    }
}

render = (res, view, model) => {
    ejs.renderFile(`templates/${view}.ejs`, model,
        function (err, result) {
            if (!err) {
                res.end(result);
            }
            else {
                res.end("An error occurred");
            }
        }
    );
}



const app = connect()
    .use(logger('dev'))
    // Cookie parser must come before setting up
    // session middleware, as the session ID
    // is a cookie
    .use(cookieparser())
    // Uses the session id cookie to lookup
    // the session object associated with the
    // user/browser
    .use(ex_session({ secret: 'cmps369' }))
    .use(bodyparse())
    .use(serve_static('public'))
    .use(serve);

http.createServer(app).listen(8080);