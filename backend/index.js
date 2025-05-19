const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;  // Utiliser la variable d'environnement ou 3000 par défaut

// Charger les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Configurer le répertoire statique pour le frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Importer les routes
const mainRoutes = require('./routes/main');
const utilisateursRoutes = require('./routes/utilisateurs');

// Définir les routes
app.use('/', mainRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);

// Middleware pour accepter les requêtes JSON
app.use(express.json());

// Connexion MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch(err => {
  console.error('Erreur MongoDB :', err);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});