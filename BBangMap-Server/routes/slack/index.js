const express = require('express');

const router = express.Router();
const slackController = require('../../src/slack/controller');

router.get('/request/list', slackController.getRequestedBakeryList);

module.exports = router;
