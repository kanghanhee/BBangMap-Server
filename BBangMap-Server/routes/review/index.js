const express = require("express");
const router = express.Router();
const authUtil = require("../../middlewares/authUtil");
const reviewController = require("../../src/review/controller");

router.get("/", authUtil.checkUuid, reviewController.reviewAll);

module.exports = router;
