const express = require("express")
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const bakeryController = require("../../src/bakery/controller")

router.get('/example', authUtil.checkUuid,bakeryController.example);

module.exports = router;