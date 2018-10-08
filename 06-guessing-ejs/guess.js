const connect = require("connect"); 
const logger = require("morgan"); 
const http = require("http"); 
const ejs = require('ejs');  
const bodyparse = require('body-parser');


const get_start_page = (req, res) => {
    // The start page is rendered with a newly
    // generated secret value, which is passed
    // to the ejs renderer via the model.
    // In this example, we place the secret 
    // number in the actual HTML as a hidden form field.

    const value = Math.floor((Math.random()*10)+1);
    console.log(`The secret number is ${value}`);
    // This is a custom function, which looks up the 
    // ejs file start.ejs in the template directory.
    // We re-use this in the other routes as well.
    render (res, "start", {value :value});
}

const check_guess_and_diplay = (req, res) => {
    // this is the secret number, passed back to 
    // use from the hidden form field
    const value = req.body.value;

    // this is the number the user guessed - 
    const guess = req.body.guess;

    if ( guess == value ) {
        render (res, "success", {});
    }
    else if ( guess < value ) {
        render (res, "guess", {value:value, message:"low"});
    }
    else {
        render (res, "guess", {value:value, message:"high"});
    }
}

const serve = (req, res) => {
    // We are now using a really simple form of routing to 
    // execute specific functions in response to specific
    // urls.  In this particular example, we do not care
    // about method (get/post).
    if ( req.url == '/start') {
        get_start_page(req, res)
    } 
    else if ( req.url == '/guess') {
        check_guess_and_diplay(req, res);
    }
    else {
        res.end("Page not found!");
    }
}

render = (res, view, model) => {
     ejs.renderFile(`templates/${view}.ejs` ,model,
        function(err, result) {
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
    .use (logger('dev'))
    .use (bodyparse())
    .use (serve);

http.createServer(app).listen(8080);
