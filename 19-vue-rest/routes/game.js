var express = require("express");
var router = express.Router();
module.exports = router;

router.get("/", function (req, res) {
    // Create a new game and save it in the db.
    // Render the page with the game id, so the client
    // code can post guesses to it.  No more sessions...
    var game = {
        secret: Math.floor(Math.random() * 10 + 1),
        guesses: [],
        date: new Date().getTime(),
        complete: false
    };
    req.db.insert(game, function (err, newDoc) {
        res.render("game", {
            game: newDoc
        });
    });
});

router.post("/:gameId", function (req, res) {
    var guess = req.body.guess;

    req.db.find({
        _id: req.params.gameId
    }, function (err, docs) {
        if (err) {
            return res.status(500).send();
        } else if (!docs.length) {
            return res.status(404).send();
        } else {
            var game = docs[0];
            var result = "success";
            if (guess < game.secret) {
                result = "low";
            } else if (guess > game.secret) {
                result = "high";
            }
            // this is asynchronous, but we don't need to wait for it...
            req.db.update({
                _id: req.params.gameId
            }, {
                $set: {
                    complete: true
                },
                $push: {
                    guesses: guess
                }
            });

            // send the response to client.
            res.json({
                result: result
            });
        }
    });
});