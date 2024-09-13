const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

// -------------- Endpoints -----------
// index route
// purpose: to respond with all of the applications
router.get("/", async function (req, res) {

    if (req.session.user) {
        try {
            const currentUser = await UserModel.findById(req.session.user._id);

            res.render("applications/index.ejs", { applications: currentUser.applications });
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }

    // applications would be a folder
    // inside of our views
    // res.render("applications/index.ejs");
});

// new route
// purpose: to respond with a form to create an application
router.get("/new", function (req, res) {
    res.render("applications/new.ejs");
});

// create route (endpoint is /users/:userId/applications)
// purpose: to take the contents of the form submitted by the client and add to the database using our mongoose Model
router.post("/", async function (req, res) {
    try {
        // look up the user (req.session.user._id)
        const currentUser = await UserModel.findById(req.session.user._id);
        // add the application (req.body) to the applications array
        currentUser.applications.push(req.body);
        // tell database we changed the user document
        await currentUser.save();
        console.log(currentUser);
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.render("applications/new.ejs", { errorMessage: "Please try again later" });
    };
});
// --------------------------------------s

module.exports = router;