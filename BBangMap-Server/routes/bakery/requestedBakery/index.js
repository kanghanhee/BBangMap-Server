const express = require('express');

const router = express.Router();
const authUtil = require('../../../middlewares/authUtil');
const requestedBakeryController = require('../../../src/requestedBakery/controller');

router.post('/', authUtil.checkToken, requestedBakeryController.requestedBakery);
router.get('/', authUtil.checkToken, requestedBakeryController.getRequestedBakeryListByUserId);
router.put('/response', authUtil.checkAdminToken, requestedBakeryController.changeRequestBakeryStatus);
router.get('/search', authUtil.checkToken, requestedBakeryController.requestBakerySearch);

module.exports = router;
