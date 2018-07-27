// *********************************
// ********** Controllers **********
// *********************************
var exports = (module.exports = {});

// *******************************************
// ********** GET Route Controllers **********
// *******************************************

// Route for signup
exports.signup = function(req, res) {
	res.render('signup');
};

// Route for signin
exports.signin = function(req, res) {
	res.render('signin');
};

// Route for the dashboard
exports.dashboard = function(req, res) {
  res.render('dashboard');
};

// Route to logout
exports.logout = function(req, res) {
	req.session.destroy(function(err) {
  	res.redirect('/');
	});
};