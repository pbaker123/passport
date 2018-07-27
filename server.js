// **********************************
// ********** DEPENDENCIES **********
// **********************************
require('dotenv').load();
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// For Express
var app = express();
var PORT = process.env.PORT || 3000;

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session(
  { 
    secret: 'promise sassy', // session secret place in .env and change this to process.env.[KEY]
    resave: true, 
    saveUninitialized:true
  })
); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// For MySQL
var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};
// add and remove!

// ****************************
// ********** MODELS **********
// ****************************
var models = require("./models");

// ***************************
// ********** ROUTES *********
// ***************************
require('./routes/authRoutes.js')(app,passport);
require('./routes/htmlRoutes.js')(app,passport);

// ********************************
// ********** STRATEGIES **********
// ********************************
require('./config/passport/passport.js')(passport, models.user);
 
///////////////////////////////////
////////// Sync Database //////////
///////////////////////////////////
models.sequelize.sync(syncOptions).then(function() {
  console.log('Nice! Database looks fine')
  // Start Server
	app.listen(PORT, function(err) {
	  if (!err) console.log("==> Listening on port " + PORT + ". Visit http://localhost:" + PORT + "/ in your browser.");
	  else console.log(err);
	});
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

