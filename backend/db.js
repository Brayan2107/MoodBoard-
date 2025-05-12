// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect('mongodb://localhost:27017/BD_Moodboard', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Arrêter le processus en cas d'échec
  }
};

module.exports = connectDB;
