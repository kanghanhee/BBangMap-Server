const express = require('express')
const router = express.Router();
const authController = require('../../src/auth/controller')

router.get('/login/apple',authController.appleLogin);

module.exports = router;