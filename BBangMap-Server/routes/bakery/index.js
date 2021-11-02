const express = require("express")
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const bakeryController = require("../../src/bakery/controller")

router.get('/map', authUtil.checkUuid, bakeryController.bakeryMap);
router.get('/search',authUtil.checkUuid, bakeryController.searchBakery);

module.exports = router;