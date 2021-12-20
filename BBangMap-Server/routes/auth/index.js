const express = require('express')
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const authController = require('../../src/auth/controller')

router.put('/login',authController.authLogin);
router.put('/logout',authUtil.checkToken,authController.logout);
router.put('/reissue',authController.reissue);

module.exports = router;