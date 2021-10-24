const express = require('express')
const router = express.Router();

router.use('/user', require('./user'));
router.use('/mission', require('./misson'));
router.use('/bakery',require('./bakery'));
router.use('/review',require('./review'));

module.exports = router;