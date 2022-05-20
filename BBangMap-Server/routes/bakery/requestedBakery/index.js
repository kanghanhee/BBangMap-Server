const express = require('express');

const router = express.Router();
const authUtil = require('../../../middlewares/authUtil');
const requestedBakeryController = require('../../../src/requestedBakery/controller');

router.post('/', authUtil.checkToken, requestedBakeryController.requestBakery);
router.get('/search', authUtil.checkToken, requestedBakeryController.requestBakerySearch);

module.exports = router;
