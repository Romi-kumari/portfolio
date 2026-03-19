const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [{
    type: String,
  }],
  publicationDate: {
    type: Date,
    required: true,
  },
  journal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Published', 'In Progress', 'Accepted'],
    default: 'In Progress',
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

module.exports = mongoose.model('Research', researchSchema);
