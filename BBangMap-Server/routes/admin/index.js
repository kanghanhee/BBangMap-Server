const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);

module.exports = router;