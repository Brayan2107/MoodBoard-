const express = require('express');
const Utilisateur = require('../models/Utilisateur'); // Importer le modèle Utilisateur
const router = express.Router();

exports.postUtilisateur = (req, res) => {
  res.send('Bonjour depuis le controller !');
};
