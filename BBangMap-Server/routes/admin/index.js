const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');
const userController = require('../../src/user/controller');
const reviewController = require('../../src/review/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);
router.get('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryListByAdmin);
router.get('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDetailByAdmin);
router.put('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryModifyByAdmin)
router.delete('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDelete);

router.get('/reviewer', authUtil.checkToken, authUtil.checkAdminToken, userController.getUserInfo);
router.get('/review/user/:userId',authUtil.checkToken, authUtil.checkAdminToken, reviewController.getUserReview);

module.exports = router;