const express = require('express');

const router = express.Router();

router.use('/auth',require('./auth'));
router.use('/user', require('./user'));
router.use('/mission', require('./mission'));
router.use('/bakery', require('./bakery'));
router.use('/review', require('./review'));

module.exports = router;
