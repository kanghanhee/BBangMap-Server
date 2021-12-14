const express = require('express')
const router = express.Router();
const authUtil = require('../../modules/auth')
const authController = require('../../src/auth/controller')

router.put('/login',authController.authLogin);
router.put('/logout',authUtil.checkToken,authController.logout);

module.exports = router;