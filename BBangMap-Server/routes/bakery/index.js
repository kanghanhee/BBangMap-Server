const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');

router.get('/map', authUtil.checkToken, bakeryController.bakeryMap);
router.get('/search', authUtil.checkToken, bakeryController.bakerySearch); // 기존 endpoint, 추후 삭제
router.get('/search/integration', authUtil.checkToken, bakeryController.bakerySearchIntegration);
router.get('/search/name', authUtil.checkToken, bakeryController.bakerySearchByName);
router.get('/search/bread', authUtil.checkToken, bakeryController.bakerySearchByBread);
router.get('/search/area', authUtil.checkToken, bakeryController.bakerySearchByArea);
router.get('/detail', authUtil.checkToken, bakeryController.bakeryDetail);
router.get('/imgs', authUtil.checkToken, bakeryController.bakeryImgList);
router.get('/recent', authUtil.checkToken, bakeryController.recentBakeryList);
router.get('/storage', authUtil.checkToken, bakeryController.storedBakeryList);
router.post('/:bakeryId/storage', authUtil.checkToken, bakeryController.storeBakery);
router.delete('/:bakeryId/storage', authUtil.checkToken, bakeryController.unStoreBakery);
router.post('/:bakeryId/visits', authUtil.checkToken, bakeryController.doBakeryVisited);
router.delete('/:bakeryId/visits', authUtil.checkToken, bakeryController.cancelBakeryVisited);
router.use('/request', require('./requestedBakery'));

module.exports = router;
