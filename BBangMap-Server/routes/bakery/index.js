const express = require("express")
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const bakeryController = require("../../src/bakery/controller")

router.get('/map', authUtil.checkToken, bakeryController.bakeryMap);
router.get('/search',authUtil.checkToken, bakeryController.bakerySearch);
router.get('/detail',authUtil.checkToken, bakeryController.bakeryDetail);
router.get('/imgs',authUtil.checkToken, bakeryController.bakeryImgList);
router.get('/storage',authUtil.checkToken, bakeryController.storedBakeryList);
router.post('/:bakeryId/storage',authUtil.checkToken, bakeryController.storeBakery);
router.delete('/:bakeryId/storage',authUtil.checkToken, bakeryController.unStoreBakery);
router.post('/:bakeryId/visits',authUtil.checkToken, bakeryController.doBakeryVisited);
router.delete('/:bakeryId/visits',authUtil.checkToken, bakeryController.cancelBakeryVisited);

module.exports = router;