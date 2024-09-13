const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// import controllers
const authController = require('./controllers/auth.js');
const applicationCtrl = require("./controllers/applications.js");

// import our middleware, set it up in the middleware chain before the controller functions
const passUserToView = require("./middleware/pass-user-to-view.js");
// setup isLoggedIn before the controller functions you want to authorize (Allow the user to access)
const isLoggedIn = require("./middleware/isLoggedIn.js");

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// this middleware function passes the user object of the logged in user to every single ejs page in your application
app.use(passUserToView);

// ---------- Endpoint ----------
// Landing page
app.get('/', (req, res) => {

  if (req.session.user) {
    // redirect to applications index route
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // render the landing page for the users that are not signed in!
    res.render("index.ejs");
  };
});

// reference for protecting our routes
// app.get('/vip-lounge', (req, res) => {
//   if (req.session.user) {
//     res.send(`Welcome to the party ${req.session.user.username}.`);
//   } else {
//     res.send('Sorry, no guests allowed.');
//   }
// });
// -----------------------------------

app.use('/auth', authController);
// the middleware here, enforces that you must be logged in to access the applicationCtrl endpoints
app.use(isLoggedIn);
app.use("/users/:userId/applications", applicationCtrl);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
