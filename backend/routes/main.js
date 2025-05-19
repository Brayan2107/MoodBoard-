const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');

router.get('/hello', mainController.sayHello);

module.exports = router;
