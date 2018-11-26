var express = require('express');
var router = express.Router();



var start = function(req, res, next) {
    console.log("Starting!");
    var value = Math.floor((Math.random()*10)+1);
    req.session.value = value;
    req.session.results = [];
    console.log("The secret number is %d", value);
    res.render('start', { });
}

/* GET start page. 
   I'm allowing the user to hit multiple URLs and 
   still get the same functionality.  I could also
   use regular expressions here, instead of explicitely
   listing multiple url paths.  Choice is yours.
*/
router.get('/', start);
router.get('/start', start);

/* POST check page. */
router.post('/guess', function(req, res, next) {
  if ( !req.session.value) {
            res.redirect('/start')
            return;
        }
        var value = req.session.value;

        var guess = req.body.guess;
        if ( guess == value ) {
            res.render('success', { });
        }
        else if ( guess < value ) {
            req.session.results.push({ guess : guess, result : "too low"});
            res.render('guess', { results:req.session.results});
        }
        else {
            req.session.results.push({ guess : guess, result : "too high"});
            res.render('guess', { results:req.session.results});
        }
        
});

/* GET suceess page. */
router.get('/success', function(req, res, next) {
  res.render('success', { });
});

module.exports = router;
