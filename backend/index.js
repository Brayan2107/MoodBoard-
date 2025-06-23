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

app.use((req, res, next) => {
  const publicPaths = [
    '/login.html',
    '/createUser.html',
    '/favicon.ico',
    '/api/login',
    '/api/register'
  ];

  const isStaticAsset = req.path.startsWith('/css/')
                    || req.path.startsWith('/js/')
                    || req.path.startsWith('/images/')
                    || req.path.startsWith('/fonts/');

  const isPublic = publicPaths.includes(req.path) || isStaticAsset;

  if (isPublic || req.session.userId) {
    next();
  } else {
    res.redirect('/login.html');
  }
});

// Servir les fichiers statiques APRES la vérification
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use(express.static(path.join(__dirname, '../frontend')));


// Routes API
app.use('/', mainRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});




