const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", function (req, res) {
    try {
        res.render("applications/index.ejs");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    };
});

router.get("/new", function (req, res) {
    res.render("applications/new.ejs");
});

module.exports = router;