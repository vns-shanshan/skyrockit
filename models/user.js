const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  notes: String,
  postingLink: String,
  status: {
    type: String,
    // visualize (VIEW) this as a dropdown (aka a select tag) menu in out html
    enum: ["interested", "applied", "interviewing", "rejected", "accepted"],
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // I user has many applications
  applications: [applicationSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;