const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);
router.get('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryListByAdmin);

module.exports = router;