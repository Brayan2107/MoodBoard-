const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Pour le hashage du mot de passe

// Définir le schéma de l'utilisateur
const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Assurer que l'email est unique
    lowercase: true,
    trim: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pour hasher le mot de passe avant de sauvegarder l'utilisateur
utilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) {
    return next(); // Si le mot de passe n'est pas modifié, on passe à la suite
  }
  
  try {
    const hash = await bcrypt.hash(this.motDePasse, 10); // Hashage avec un sel de 10
    this.motDePasse = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Créer un modèle à partir du schéma
const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;
