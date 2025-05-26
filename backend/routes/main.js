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

const parametreController = require('../controllers/parametreController');
router.get('/hello', mainController.sayHello);

router.post('/send-mail', mailController.sendMail)
router.post('/rappelle-mail', mailController.sendRappelleEmail)

router.get('/humeur', humeurController.getAllUserHummeur)
router.post('/post-humeur', humeurController.postHumeur)


router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

router.get('/api/controller/get-user/:id',  parametreController.getUser)
router.put('/api/controller/put-user/:id', parametreController.updateUser )
router.put('/api/controller/change-password/:id', parametreController.changePassword);

module.exports = router;
