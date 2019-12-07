/**
 * App.js
 * 
 * This is our entry into the YelCamp Node appliaction. It handles the initial setup,
 * importation, and execution of our CampMii app.
 */


const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    seedDatabase = require("./public/util/seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    indexRoutes = require("./routes/indexRoute"),
    commentRoutes = require("./routes/commentRoute"),
    campgroundRoutes = require("./routes/campgroundRoute"),
    env = require('dotenv');

env.config();

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGOATLAS_URI || 'mongodb://localhost/camp-mii';
const port = process.env.PORT || 3000;


mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));
      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// seedDatabase();

// Passport Config
app.use(require("express-session")({
    secret: "Speak Friend and Enter",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to check if user is logged in for each route. This will pass the local variable currentUser to each template for use.
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// Setup Moment for time stamps
app.locals.moment = require('moment');


// Let express use our routes that we've imported above.
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(port, process.env.IP, () => {
    console.log(`CampMii has booted up on port ${port}`);
})