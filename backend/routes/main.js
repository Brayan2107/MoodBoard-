const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');
const humeurController = require('../controllers/humeurController');
const userController = require('../controllers/userController');
const User = require('../models/user'); 

function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    next(); 
  } else {
    res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
  }
}

router.get('/hello', mainController.sayHello);

router.post('/send-mail', mailController.sendMail)
router.post('/rappelle-mail', mailController.sendRappelleEmail)

router.get('/humeur', ensureAuthenticated, humeurController.getAllUserHummeur)

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

router.get('/index.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

router.get('/historiqueHumeur.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/historiqueHumeur.html'));
});

module.exports = router;
