/**
 * User.js
 * 
 * This module represents the schema and model of a comment in our database.
 */

const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

// Define User Schema
let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Hook up the passport.js with our schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
