/**
 * indexRoute.js
 * 
 * This class represents the index route that hosts a few misc. things:
 * 
 *  - Landing
 *  - Register
 *  - Login
 *  - Logout
 */

const express = require("express"),
router = express.Router(),
passport = require("passport"),
User = require("../models/user");
module.exports = router;

/**
 * Landing page for CampMii
 */
router.get("/", (req, res) => {
    res.redirect("/campgrounds")
})

/**
 * Show Registration Form - Shows the registration form for a new user.
 */
router.get("/register", (req, res) => {
    res.render("register");
})

/**
 * Handle Signup Form - Handles the post request for when a user registers a new account.
 */
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to CampMii " + user.username);
            res.redirect("/campgrounds")
        })
    });
})

/**
 * Show Login Form - Shows the login form to the user.
 */
router.get("/login", (req, res) => {
    res.render("login");
})

/**
 * Handle Login Form - Handles the authentication of the login form and redirects to appropriate
 * route.
 */
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }));

/**
 * Handle Logout - Includes the lsogic for when user logs out of their account.
 */
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
})