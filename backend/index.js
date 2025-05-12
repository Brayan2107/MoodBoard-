const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

const connectDB = require('./db');  // Importer la fonction de connexion à MongoDB

// Middleware pour accepter les requêtes JSON
app.use(express.json());

// Appeler la fonction pour se connecter à MongoDB
connectDB();

// Définir une route pour tester la connexion
app.get('/', (req, res) => {
  res.send('Hello, MongoDB connected!');
});

// Démarrer le serveur Express
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
