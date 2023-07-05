const express = require('express');
const router = express.Router();
const authUtil = require('../../middlewares/authUtil');
const homeController = require('../../src/home/controller');

router.get('/', authUtil.checkToken, homeController.getHomeList);

module.exports = router;
