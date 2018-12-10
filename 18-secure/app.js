var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require("bcrypt");
var flash      = require('connect-flash');

/* The following user credentials should NEVER be stored liked this!  Always put
   your username/passwords in a database - not code!

   Of course, you'd probably also have MANY usernames and passwords!
*/
var username = "guest";
var password = "password";

//genSalt is creating a random salt value, which is then used in the callback to set a hashed password.
bcrypt.genSalt(10, function(err, salt) {
    console.log(`Salt generated = ${salt}`);


    bcrypt.hash(password, salt, function(err, hash) {    
        // The global password value is now reset to the hashed version.
        password = hash;
        console.log(`Hashed salt/password = ${password}`);
        
        // Important:  Note that the result "hash" is the salt, then a / , then
        // the hashed salt.password combination.  
        // salt/hash(salt+password)
        // This is just a convention.  it allows us to store this hash
        // as a single string, and later use it to compare, using the bcrypt library.
        //
    });
});

// Note, I hashed the password "password" and stored it here.  In a system that allowed users to register,
// the user would type a plain text password ("password") and your code would hash it and store in a database.





var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ secret: 'cmps369'}))
app.use(express.static(path.join(__dirname, 'public')));

// Set up passport to help with user authentication (guest/password)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());





passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },

    function(user, pswd, done) {
        if ( user != username ) {
            console.log("Username mismatch");
            return done(null, false);
        }

        // Remember:
        // - pswd is the plain text password the user just entered to try to login.
        // - password is actually salt/hash(salt+password) - so the bcrypt library 
        // - extracts the salt value from "password", hashes salt+pswd, and compares against
        // - provided hash.
        bcrypt.compare(pswd, password, function(err, isMatch) {
            if (err) return done(err);
            if ( !isMatch ) {
                console.log("Password mismatch");
            }
            else {
                console.log("Valid credentials");
            }
            done(null, isMatch);
        });
      }
  ));

  passport.serializeUser(function(username, done) {
      // this is called when the user object associated with the session
      // needs to be turned into a string.  Since we are only storing the user
      // as a string - just return the username.
      done(null, username);
  });

  passport.deserializeUser(function(username, done) {
      // normally we would find the user in the database and
      // return an object representing the user (for example, an object
      // that also includes first and last name, email, etc)
      done(null, username);
   });


// Posts to login will have username/password form data.
// passport will call the appropriate functions...
routes.post('/login',
    // This authenticate function is being called, and it generates
    // middleware that is used to do the authentication, using the 
    // strategy specified above.
    passport.authenticate('local', { successRedirect: '/start',
                                     failureRedirect: '/login_fail',
                                  })
);

routes.get('/login', function (req, res) {
  res.render('login', {});
});

routes.get('/login_fail', function (req, res) {
  res.render('login_fail', {});
});

routes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


app.use('/', routes);


module.exports = app;
