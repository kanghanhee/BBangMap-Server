const express = require("express");
const router = express.Router();
const authUtil = require("../../middlewares/authUtil");
const reviewUpload = require("../../modules/multer/reviewMulter");
const reviewController = require("../../src/review/controller");
const reviewImgUpload = reviewUpload.fields([
  { name: "reviewImgList", maxCount: 5 },
]);

router.get("/", authUtil.checkUuid, reviewController.reviewAll);
router.get("/bakery", authUtil.checkUuid, reviewController.reviewOfBakery);
router.get("/search", authUtil.checkUuid, reviewController.reviewSearch);
router.get("/detail", authUtil.checkUuid, reviewController.reviewDetail);
router.get(
  "/storage",
  authUtil.checkUuid,
  reviewController.savedReviewFolderList
);
router.get(
  "/storage/:bakeryId",
  authUtil.checkUuid,
  reviewController.savedReviewOfBakeryList
);
router.get("/my", authUtil.checkUuid, reviewController.myReview);

router.post(
  "/my",
  authUtil.checkUuid,
  reviewImgUpload,
  reviewController.addReview
);
router.post(
  "/storage/:reviewId",
  authUtil.checkUuid,
  reviewController.saveReview
);
router.post("/like/:reviewId", authUtil.checkUuid, reviewController.likeReview);

router.delete(
  "/my/:reviewId",
  authUtil.checkUuid,
  reviewController.deleteMyReview
);
router.delete(
  "/storage/:reviewId",
  authUtil.checkUuid,
  reviewController.unSaveReview
);
router.delete(
  "/unlike/:reviewId",
  authUtil.checkUuid,
  reviewController.unLikeReview
);

module.exports = router;
