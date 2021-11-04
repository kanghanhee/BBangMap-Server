const express = require("express")
const router = express.Router();
const authUtil = require('../../middlewares/authUtil')
const bakeryController = require("../../src/bakery/controller")

router.get('/map', authUtil.checkUuid, bakeryController.bakeryMap);
router.get('/search',authUtil.checkUuid, bakeryController.bakerySearch);
router.get('/detail',authUtil.checkUuid, bakeryController.bakeryDetail);

module.exports = router;