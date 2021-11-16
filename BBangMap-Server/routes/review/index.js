const express = require("express");
const router = express.Router();
const authUtil = require("../../middlewares/authUtil");
const reviewController = require("../../src/review/controller");

router.get("/", authUtil.checkUuid, reviewController.reviewAll);
router.get("/bakery", authUtil.checkUuid, reviewController.reviewOfBakery);
router.get("/search", authUtil.checkUuid, reviewController.reviewSearch);
router.get("/detail", authUtil.checkUuid, reviewController.reviewDetail);
router.get("/storage", authUtil.checkUuid, reviewController.savedReviewList);
router.post(
  "/storage/:reviewId",
  authUtil.checkUuid,
  reviewController.saveReview
);

module.exports = router;
