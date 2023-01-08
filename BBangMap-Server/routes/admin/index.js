const express = require('express');
const router = express.Router();
const imageUpload = require('../../modules/multer/curationMulter');
const adminImageUpdate = require('../../modules/multer/adminMulter')
const authUtil = require('../../middlewares/authUtil');
const bakeryController = require('../../src/bakery/controller');
const userController = require('../../src/user/controller');
const reviewController = require('../../src/review/controller');
const curationController = require('../../src/curation/controller');
const requestBakeryController = require('../../src/requestedBakery/controller');
const adminController = require('../../src/admin/controller');

router.post('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.registerBakery);
router.get('/bakery', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryListByAdmin);
router.get(
  '/bakery/request',
  authUtil.checkToken,
  authUtil.checkAdminToken,
  requestBakeryController.getRequestedBakeryList,
);
router.get('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDetailByAdmin);
router.put('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryModifyByAdmin);
router.delete('/bakery/:bakeryId', authUtil.checkToken, authUtil.checkAdminToken, bakeryController.bakeryDelete);
router.post(
  '/bakery/image/:bakeryId',
  authUtil.checkToken,
  authUtil.checkAdminToken,
  imageUpload.single('bakeryImage'),
  bakeryController.bakeryMainImage,
);

router.get('/reviewer', authUtil.checkToken, authUtil.checkAdminToken, userController.getUserInfo);
router.get('/review/user/:userId', authUtil.checkToken, authUtil.checkAdminToken, reviewController.getUserReview);
router.get('/curation', authUtil.checkToken, authUtil.checkAdminToken, curationController.getCurationListByAdmin);
router.get('/curation/content', authUtil.checkToken, authUtil.checkAdminToken, curationController.getCurationContent);
router.post(
  '/curation',
  authUtil.checkToken,
  authUtil.checkAdminToken,
  imageUpload.single('curationImage'),
  curationController.addCuration,
);
router.put(
  '/curation/priority/:curationContentId',
  authUtil.checkToken,
  authUtil.checkAdminToken,
  curationController.updateCurationPriority,
);
router.put('/curation/:curationId', authUtil.checkToken, authUtil.checkAdminToken, curationController.updateCuration);

router.post('/image/change',authUtil.checkToken, authUtil.checkAdminToken, adminImageUpdate.array('adminImage',10),adminController.changeImageUrl);
router.get('/count/research',authUtil.checkToken, authUtil.checkAdminToken, adminController.researchCount);
router.get('/count/review/like',authUtil.checkToken, authUtil.checkAdminToken, adminController.likeCountOfReview);
router.get('/count/review/save',authUtil.checkToken, authUtil.checkAdminToken, adminController.saveCountOfReview);
router.get('/count/curation/like',authUtil.checkToken, authUtil.checkAdminToken, adminController.likeCountOfCuration);
router.get('/count/bakery/save', authUtil.checkToken, authUtil.checkAdminToken, adminController.saveCountOfBakery);
router.get('/count/bakery/visit', authUtil.checkToken, authUtil.checkAdminToken, adminController.visitCountOfBakery);
router.get('/count/user/join', authUtil.checkToken, authUtil.checkAdminToken, adminController.joinCountOfUser);

module.exports = router;
