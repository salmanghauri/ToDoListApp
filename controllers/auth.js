const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator');
// const { use } = require("passport");

//Rendering Sign up Page - Get
exports.auth_signup_get = (req,res) => {
    res.render("signup");
}

//Rendering Sign In Page - Get
exports.auth_signin_get = (req, res) => {
    res.render("signin");
}
//rendering Profile Page - GET
exports.auth_profile_get = (req,res) => {
    let user = req.user;
    res.render("profile", {user});
}

//Posting Sign up Data - POST
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt)
    user.password = hash;
    user.save()
    .then(()=> {
        res.redirect('/signin');
    })
    .catch((err)=> {
        if(err.code == 11000) {
            req.flash("error", "Email Already Exists");
            res.redirect("/auth/signin");
        } 
        else {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                req.flash("validationError", errors.error);
                res.redirect('/auth/signup');
            }

        }
    })
};
//Posting Sign in Data - POST
exports.auth_signin_post = 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: "Invalid username or password",
        successFlash: "You are logged in successfully"
});
//logout user - GET
exports.auth_logout_get = (req, res) => {
    req.logout();
    req.flash("success", "You are successfully logged out");
    res.redirect("/signin");
};