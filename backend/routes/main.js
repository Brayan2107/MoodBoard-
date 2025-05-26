const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');
const humeurController = require('../controllers/humeurController');
const userController = require('../controllers/userController');
const parametreController = require('../controllers/parametreController');
router.get('/hello', mainController.sayHello);

router.post('/send-mail', mailController.sendMail)
router.post('/rappelle-mail', mailController.sendRappelleEmail)

router.get('/humeur', humeurController.getAllUserHummeur)


router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

router.get('/api/controller/get-user/:id',  parametreController.getUser)
router.put('/api/controller/put-user/:id', parametreController.updateUser )

module.exports = router;
