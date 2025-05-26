const User = require('../models/user');

// Créer un utilisateur
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifie si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Crée un nouvel utilisateur
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    req.session.userId = user._id; // Création session

    res.json({ message: 'Connexion réussie', user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Vérifier session utilisateur
exports.getCurrentUser = (req, res) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(user => res.json({ username: user.name }))
      .catch(err => res.status(500).json({ message: 'Erreur serveur', error: err.message }));
  } else {
    res.status(401).json({ message: 'Non authentifié' });
  }
};