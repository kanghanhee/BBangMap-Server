const express = require('express');

const router = express.Router();
const slackController = require('../../src/slack/controller');

router.post('/request/list', slackController.getRequestedBakeryList);

module.exports = router;
