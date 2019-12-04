/**
 * commentRoute.js
 * 
 * This class represents the comment route that handles misc comment functionality in YelpCamp.
 * 
 *  - New Comment Form
 *  - Post New Comment
 */

const express = require("express"),
    router = express.Router(),
    middleware = require("../middleware/index"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
module.exports = router;

/**
 * Show New Comment Form - Shows form to add new comment to campground, but only if 
 * user is currently logged in.
 */
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("comments/new", { campground: campground });
    })
});

/**
 * Create New Comment - Creates a new comment for specific campground
 */
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {

    // Find campground by ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                // Add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // Save the comment
                comment.save();
                foundCampground.comments.push(comment);
                foundCampground.save();
                req.flash("success", "Comment added");
                res.redirect("/campgrounds/" + foundCampground._id)
            })
        }
    });
})

/**
 * Edit Comment Route - This displays the form to edit a comment, so long 
 * as the user is authenticated to do so.
 */
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.isCommentOwner, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
        }
    })
})

/**
 * Update Comment Route - Updates a certain comment with new text.
 */
router.put("/campgrounds/:id/comments/:comment_id", middleware.isCommentOwner, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back")
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

/**
* Destroy Comment - Deletes a certain comment from the DB
*/
router.delete("/campgrounds/:id/comments/:comment_id", middleware.isCommentOwner, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back")
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})