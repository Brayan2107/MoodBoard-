const express = require('express');
const Utilisateur = require('../models/Utilisateur'); // Importer le modèle Utilisateur
const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/inscription', async (req, res) => {
  const { nom, email, motDePasse } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const utilisateurExist = await Utilisateur.findOne({ email });
  if (utilisateurExist) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  try {
    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({ nom, email, motDePasse });

    // Sauvegarder l'utilisateur dans la base de données
    await nouvelUtilisateur.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
