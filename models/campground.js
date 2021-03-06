/**
 * Campground.js
 * 
 * This module represents the schema and model of a campground in our database.
 */

const mongoose = require("mongoose");
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    cost: Number,
    location: String,
    lat: Number,
    lon: Number,
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    author:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);

