const express = require('express');
const path = require('path');
const session = require('express-session');
const connectDB = require('./db');
const mainRoutes = require('./routes/main');

connectDB();

const app = express();
const port = 3000;

// Middleware Session
app.use(session({
  secret: 'une_cle_secrete_a_changer',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

app.use(express.json());

// Middleware pour vérifier l'authentification avant chaque accès aux pages HTML
app.use((req, res, next) => {
  const publicPages = ['/login.html', '/createUser.html', '/api/login', '/api/register', '/css/', '/js/', '/favicon.ico'];
  const isPublic = publicPages.some(page => req.path.startsWith(page));

  if (isPublic || req.session.userId) {
    next();
  } else {
    res.redirect('/login.html');
  }
});


// Servir les fichiers statiques APRES la vérification
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));


// Routes API
app.use('/', mainRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

// Redirection par défaut vers login si rien d'autre n'est attrapé
app.use((req, res) => {
  res.redirect('/login.html');
});


