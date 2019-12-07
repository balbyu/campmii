/**
 * Comment.js
 * 
 * This module represents the schema and model of a comment in our database.
 */

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
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
            ref: "User",
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);