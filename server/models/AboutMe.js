const mongoose = require('mongoose');

const aboutMeSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AboutMe', aboutMeSchema);
