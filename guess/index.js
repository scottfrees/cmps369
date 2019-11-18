const connect = require('connect');
const logger = require('morgan');
const bodyparse = require('body-parser');
const ejs = require('ejs');
const http = require('http');

const render_template = (req, res, template_path, model) => {
    ejs.renderFile(`templates/${template_path}.ejs`, model, function(err, html) {
        console.log("Inside the callback of ejs render");
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("<!doctype html><html><body><p>Something went wrong</p></body></html>");
            console.log(err);
        }
        else {
            //console.log("Sending html");
            //console.log(html);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        }
    });
}

const serve = (req, res) => {
    console.log("Hello - got a request");
    console.log(req.url);
    if (req.url == '/start') {
        console.log("Rendering start page for user");
        const secret = Math.ceil(Math.random() * 10);
        render_template(req, res, 'start', { secret: secret });
    }
    else if (req.url == '/check') {
        console.log(req.body);
        if (req.body.secret === req.body.guess) {
            render_template(req, res, 'success', {});
        }
        else {
            let message;
            const secret = parseInt(req.body.secret);
            const guess = parseInt(req.body.guess);
            if (secret > guess) {
                message = "Sorry, your guess is too low.";
            }
            else {
                message = "Sorry, your guess is too high.";
            }
            render_template(req, res, 'check', { secret: req.body.secret, message: message });
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<!doctype html><html><body><p>Not Here</p></body></html>");
    }

}

const app = connect()
    .use(logger('dev'))
    .use(bodyparse())

    .use(serve);

http.createServer(app).listen(8080);
