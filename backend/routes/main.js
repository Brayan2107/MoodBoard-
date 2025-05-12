const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/hello', mainController.sayHello);


module.exports = router;
