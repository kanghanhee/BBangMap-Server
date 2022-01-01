const express = require('express');

const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const reviewUpload = require('../../modules/multer/reviewMulter');
const reviewController = require('../../src/review/controller');

const reviewImgUpload = reviewUpload.fields([{ name: 'reviewImgList', maxCount: 5 }]);

router.get('/', authUtil.checkToken, reviewController.reviewAll);
router.get('/bakery', authUtil.checkToken, reviewController.reviewOfBakery);
router.get('/search', authUtil.checkToken, reviewController.reviewSearch);
router.get('/detail', authUtil.checkToken, reviewController.reviewDetail);
router.get('/storage', authUtil.checkToken, reviewController.savedReviewFolderList);
router.get('/storage/:bakeryId', authUtil.checkToken, reviewController.savedReviewOfBakeryList);
router.get('/my', authUtil.checkToken, reviewController.myReview);

router.post('/my', authUtil.checkToken, reviewImgUpload, reviewController.addReview);
router.post('/storage/:reviewId', authUtil.checkToken, reviewController.saveReview);
router.post('/like/:reviewId', authUtil.checkToken, reviewController.likeReview);

router.put('/my/:reviewId', authUtil.checkToken, reviewImgUpload, reviewController.updateReview);

router.delete('/my/:reviewId', authUtil.checkToken, reviewController.deleteMyReview);
router.delete('/storage/:reviewId', authUtil.checkToken, reviewController.unSaveReview);
router.delete('/unlike/:reviewId', authUtil.checkToken, reviewController.unLikeReview);

module.exports = router;
