const express = require("express")
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const bakeryController = require("../../src/bakery/controller")

router.get('/map', authUtil.checkUuid, bakeryController.bakeryMap);
router.get('/search',authUtil.checkUuid, bakeryController.bakerySearch);
router.get('/detail',authUtil.checkUuid, bakeryController.bakeryDetail);
router.get('/imgs',authUtil.checkUuid, bakeryController.bakeryImgList);
router.get('/storage',authUtil.checkUuid, bakeryController.storedBakeryList);
router.post('/:bakeryId/storage',authUtil.checkUuid, bakeryController.storeBakery);
router.delete('/:bakeryId/storage',authUtil.checkUuid, bakeryController.unStoreBakery);
router.post('/registration',authUtil.validAdmin, bakeryController.registerBakery);

module.exports = router;