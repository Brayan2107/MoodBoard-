const mongoose = require('mongoose');

const humeurSchema = new mongoose.Schema({
  user: {
    type: String, 
    required: true
  },
  date: {
    type: String, 
    required: true
  },
  mood: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Humeur', humeurSchema);
