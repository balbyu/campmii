/**
 * App.js
 *
 * This is our entry into the YelCamp Node appliaction. It handles the initial setup,
 * importation, and execution of our CampMii app.
 */

// Variable declaration
const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User = require("./models/user"),
  indexRoutes = require("./routes/indexRoute"),
  commentRoutes = require("./routes/commentRoute"),
  campgroundRoutes = require("./routes/campgroundRoute"),
  dotenv = require("dotenv");

dotenv.config();

/* Setup Database */
mongoose.Promise = global.Promise;

const databaseUri =
  process.env.MONGOATLAS_URI || "mongodb://localhost/camp-mii";
const port = process.env.PORT || 3000;

mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));

/* Setup Middlware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);
app.set("view engine", "ejs");

/* Setup Passport.js */
app.use(
  require("express-session")({
    secret: "Speak Friend and Enter",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Middleware to check if user is logged in for each route */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.locals.moment = require("moment");

/* Kick off server */
app.listen(port, process.env.IP, () => {
  console.log(`CampMii has booted up on port ${port}`);
});
