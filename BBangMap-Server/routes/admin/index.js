const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);
router.get('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryListByAdmin);
router.get('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDetailByAdmin);
router.put('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryModifyByAdmin)

module.exports = router;