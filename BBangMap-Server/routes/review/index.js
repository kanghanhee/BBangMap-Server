const express = require("express");
const router = express.Router();
const authUtil = require("../../middlewares/authUtil");
const reviewController = require("../../src/review/controller");

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
  "/storage/:reviewId",
  authUtil.checkUuid,
  reviewController.saveReview
);
router.delete(
  "/storage/:reviewId",
  authUtil.checkUuid,
  reviewController.unSaveReview
);
module.exports = router;
