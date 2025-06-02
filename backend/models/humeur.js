const mongoose = require('mongoose');

const humeurSchema = new mongoose.Schema({
  humeur: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Humeur', humeurSchema);