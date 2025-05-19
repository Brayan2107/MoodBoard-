const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');
const humeurController = require('../controllers/humeurController');
const userController = require('../controllers/userController');
router.get('/hello', mainController.sayHello);
router.post('/humeur', humeurController.postHumeur);

router.get('/humeur', humeurController.getAllUserHummeur)


router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

module.exports = router;
