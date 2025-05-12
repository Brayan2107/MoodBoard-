const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mailController = require('../controllers/mailController');

router.get('/hello', mainController.sayHello);

router.post('/send-mail', mailController.sendMail)

module.exports = router;
