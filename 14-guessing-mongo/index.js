const connect = require('connect');
const logger = require("morgan");
const serve_static = require("serve-static");
const http = require('http');
const ejs = require('ejs');
const bodyparse = require('body-parser');
const cookieparser = require('cookie-parser');
const ex_session = require('express-session');
const dateformat = require('dateformat');


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/cmps369';
let games; // will hold the games collection.


// First we'll connect to the database, and once we do, THEN we'll start up the web server.
// This way we can be sure we won't serve any requests without a valid connection to the database.
const startup = async () => {
    try {
        const connection = await MongoClient.connect(url);
        const db = connection.db('cmps369');
        games = await db.createCollection("games");

        const app = connect()
            .use(logger('dev'))
            .use(cookieparser())
            .use(ex_session({ secret: 'cmps369' }))
            .use(bodyparse())
            .use(serve_static('public'))
            .use(serve);

        http.createServer(app).listen(8080);

    } catch (ex) {
        console.error(ex);
    }
    // Don't close the DB connection!  It is actually a pool
    // of connections, and you keep this alive for the lifetime
    // of the program.  It will automatically close itself correctly
    // on application shut down.


}


const serve = async (req, res) => {
    try {
        console.log(req.url + " has been requested");
        if (req.url == "/start" || req.url == '/') {
            // We cannot render the response until we are fully initialized - 
            // specifically, the session object on req will be destroyed
            // once we send a response - so we must pass the render code
            // in as a callback for init to call when it's done initializing 
            // the session.
            await init(req);
            render(res, "guess_ajax", {});
        }
        else if (req.url == "/history") {
            console.log("Looking up full history");
            const result = await games.find({ completed: true }).toArray();
            console.log(result);
            render(res, "guess_history", { games: result, df: dateformat });
        }
        else if (req.url.indexOf("/historyof") == 0) {
            const url = require('url');
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;
            console.log("Looking up " + query.id);
            const doc = await games.findOne({ _id: ObjectID(query.id) });
            console.log(doc);
            render(res, "guess_historyof", { game: doc, df: dateformat });
        }
        else if (req.url == "/guess") {
            // Ajax request - just return json indicating result
            const value = req.session.value;
            const guess = req.body.guess;
            console.log(value + ' <> ' + guess);

            if (guess == value) {
                await mark_success(req.session.game_id);
                await init(req);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result: 'success' }));
            }
            else if (guess < value) {
                await log_guess(req.session.game_id, guess);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result: 'low' }));
            }
            else {
                await log_guess(req.session.game_id, guess);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result: 'high' }));
            }
        }
    } catch (ex) {
        console.error(ex);
        res.writeHead(500, {});
        res.end();
    }
}


const mark_success = async (game_id) => {
    console.log(game_id);
    await games.updateOne({ _id: ObjectID(game_id) }, { '$set': { completed: true } });
}

// Calls an async function, but doesn't actually wait - there is no need
// to..
const log_guess = async (game_id, guess) => {
    await games.updateOne({ _id: ObjectID(game_id) }, { '$push': { guesses: guess } });
}

// This is an async function that we want to wait on - since
// we can't proceed until we have the result of the insertion!
const init = async (req) => {
    const value = Math.floor((Math.random() * 10) + 1);
    const doc = await games.insertOne({ date: new Date(), secret: value });
    req.session.game_id = doc.ops[0]._id;
    req.session.value = value;
    console.log("Game ID => " + req.session.game_id);
}

function render(res, view, model) {
    ejs.renderFile("templates/" + view + ".ejs", model,
        function (err, result) {
            if (!err) {
                res.end(result);
            }
            else {
                res.end("An error occurred");
                console.log(err);
            }
        }
    );
}


startup();