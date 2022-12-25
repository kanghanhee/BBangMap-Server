const express = require('express');

const router = express.Router();
const healthController = require('../../src/health/controller');

router.get('/', healthController.getHealth);

module.exports = router;