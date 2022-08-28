const express = require('express');
const router = express.Router();
const imageUpload = require('../../modules/multer/curationMulter');
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');
const userController = require('../../src/user/controller');
const reviewController = require('../../src/review/controller');
const curationController = require('../../src/curation/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);
router.get('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryListByAdmin);
router.get('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDetailByAdmin);
router.put('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryModifyByAdmin)
router.delete('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDelete);
router.post('/bakery/image/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, imageUpload.single('bakeryImage'),bakeryController.bakeryMainImage);

router.get('/reviewer', authUtil.checkToken, authUtil.checkAdminToken, userController.getUserInfo);
router.get('/review/user/:userId',authUtil.checkToken, authUtil.checkAdminToken, reviewController.getUserReview);
router.get('/curation/content',authUtil.checkToken, authUtil.checkAdminToken, curationController.getCurationContent);
router.post('/curation',authUtil.checkToken, authUtil.checkAdminToken, imageUpload.single('curationImage'), curationController.addCuration);
router.put('/curation/priority/:curationContentId',authUtil.checkToken, authUtil.checkAdminToken, curationController.updateCurationPriority);
router.put('/curation/:curationId',authUtil.checkToken, authUtil.checkAdminToken, curationController.updateCuration);

module.exports = router;