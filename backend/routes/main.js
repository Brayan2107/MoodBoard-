const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const utilisateurController = require('../controllers/utilisateurController');
const Utilisateur = require('../models/Utilisateur');

router.get('/hello', mainController.sayHello);

router.post('/inscription',  utilisateurController.postUtilisateur);


module.exports = router;
