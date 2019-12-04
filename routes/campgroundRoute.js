/**
 * campgroundRoute.js
 * 
 * This class represents the campground route that handles the rendering of all campground related routes.
 * 
 *  - Show All Campgrounds
 *  - Show Create Campground Page
 *  - Shows Individual Campground
 */

const express = require("express"),
    router = express.Router(),
    middleware = require("../middleware/index"),
    Campground = require("../models/campground");

module.exports = router;

/**
 * Index route - Shows all campgrounds in the DB.
 */
router.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // Send campgrounds to the .ejs file under var "campgrounds"
            res.render("campgrounds/index",
                {
                    campgrounds: allCampgrounds
                });
        }
    })
})

/**
 * Post New Campground - posts a new campground to the DB
 */
router.post("/campgrounds", middleware.isLoggedIn, (req, res) => {
    // Get data from form and add to campgrounds array
    let name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        }
    newCampground = { name: name, image: image, description: description, author: author };

    // Create new campground in DB
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    }
    )
})

/**
 * Create New Campground - Shows the form to create new campground
 */
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

/**
 * Show Individual Campground - Show an individual campground from DB based on its ID.
 */
router.get("/campgrounds/:id", (req, res) => {

    // Find campground by ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {

        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})

/**
 * Edit Campground - Shows the edit form for an individual campground
 */
router.get("/campgrounds/:id/edit", middleware.isCampgroundOwner, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    })
})

/**
* Update Campground - Puts the updated campground information into DB
*/
router.put("/campgrounds/:id", middleware.isCampgroundOwner, (req, res) => {
    // Find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

/**
* Destroy Campground - Deletes a certain campground from the DB
*/
router.delete("/campgrounds/:id", middleware.isCampgroundOwner, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    });
})