const express = require("express")
const router = express.Router();
const bakeryController = require("../../src/bakery/controller")

router.get('/example', bakeryController.example);

module.exports = router;