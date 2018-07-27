// **********************************
// ********** DEPENDENCIES **********
// **********************************
var htmlController = require("../controllers/htmlController.js");

// ***************************
// ********** ROUTES *********
// ***************************
module.exports = function(app, passport) {
	// ********************************
  // ********** GET Routes **********
  // ********************************
	app.get('/signup', authController.signup);
	app.get('/signin', authController.signin);
	app.get('/dashboard',isLoggedIn, authController.dashboard);
	app.get('/logout',authController.logout);
	
	// Protects the dashboard route to only allow signed in user
 	function isLoggedIn(req, res, next) {
  	if (req.isAuthenticated())
    	return next();
    res.redirect('/signin');
	};
};