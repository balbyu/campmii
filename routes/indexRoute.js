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
 * Handle Signup Form - Handles the post request for when a user registers a new account.
 */
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds")
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to CampMii " + user.username);
            res.redirect("/campgrounds")
        })
    });
})

/**
 * Handle Login Form - Handles the authentication of the login form and redirects to appropriate
 * route.
 */
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/loginfailed",
    }));


/**
 * Handle Logout - Includes the lsogic for when user logs out of their account.
 */
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
})

//Route to login page if user failed to login. I created this to allow flash messages and not interfere with regular login route
router.get("/loginfailed", (req, res) => {

    req.flash("error", "Invalid username or password");
    res.redirect("/campgrounds");
});