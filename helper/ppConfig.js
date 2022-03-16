const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy

const User = require("../models/User");

//serialize User - storing info in session
//saving data to the session
//we can save any information in the session
//ssaving ID because its a unique identifier given to every user
passport.serializeUser(function(user, done) {
    done(null, user.id);
})
//DONE - ALLOWS CODE TO CONTINUE
//deserializeUser - restoring info in session according to ID
//reading information from the database according to the user id (session)
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        done(err,user);
    })
})
passport.use(new LocalStrategy(
    {
        usernameField: "emailAddress",
        passwordField: "password"
    },
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
module.exports = passport;