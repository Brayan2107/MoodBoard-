const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');
const humeurController = require('../controllers/humeurController');
const userController = require('../controllers/userController');
router.get('/hello', mainController.sayHello);

router.post('/send-mail', mailController.sendMail)
router.post('/rappelle-mail', mailController.sendRappelleEmail)

router.get('/humeur', humeurController.getAllUserHummeur)


router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
