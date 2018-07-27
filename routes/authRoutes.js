// ***************************
// ********** ROUTES *********
// ***************************
module.exports = function(app, passport) {
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/menu",
      failureRedirect: "/"
    })
  );
  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/menu",
      failureRedirect: "/"
    })
  );
};
 	