const express = require("express");
const router = express.Router();
const authUtil = require("../../middlewares/authUtil");
const reviewController = require("../../src/review/controller");

router.get("/", authUtil.checkUuid, reviewController.reviewAll);
router.get("/search", authUtil.checkUuid, reviewController.reviewSearch);
router.get("/detail", authUtil.checkUuid, reviewController.reviewDetail);
router.get("/storage", authUtil.checkUuid, reviewController.storedReviewList);

module.exports = router;
