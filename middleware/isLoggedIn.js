function isLoggedIn(req, res, next) {
    // if the user is logged in precede as normal
    if (req.session.user) return next();
    // if the user is not logged in redirect to the sign in page
    res.redirect("/auth/sign-in");
};

module.exports = isLoggedIn;