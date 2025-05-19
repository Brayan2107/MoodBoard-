const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');
const humeurController = require('../controllers/humeurController');

router.get('/hello', mainController.sayHello);
router.post('/humeur', humeurController.postHumeur);

module.exports = router;
