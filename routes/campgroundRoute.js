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
    Campground = require("../models/campground"),
    NodeGeocoder = require('node-geocoder'),
    dotenv = require("dotenv");

module.exports = router;

/**
 * Run dotenv config again. For some reason this class gets built first
 *  and we don't have the env setup.
 */

dotenv.config();


const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(options);

/**
 * Index route - Shows all campgrounds in the DB.
 */
router.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error getting to campgrounds index", err.message);
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
    // get data from form and add to campgrounds array
    const name = req.body.name,
        image = req.body.image,
        cost = req.body.cost,
        desc = req.body.description,
        author = { d: req.user._id, username: req.user.username }

    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            console.log(err);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }

        const lat = data[0].latitude,
            lon = data[0].longitude,
            location = data[0].formattedAddress,
            newCampground =
            {
                name: name,
                image: image,
                description: desc,
                cost: cost,
                author: author,
                location: location,
                lat: lat,
                lon: lon
            };
        // Create a new campground and save to DB
        Campground.create(newCampground, function (err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
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

router.put("/:id", middleware.isCampgroundOwner, (req, res) => {
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lon = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;

        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

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