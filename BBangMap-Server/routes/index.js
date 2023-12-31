const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/mission', require('./mission'));
router.use('/bakery', require('./bakery'));
router.use('/review', require('./review'));
router.use('/curation', require('./curation'));
router.use('/admin', require('./admin'));
router.use('/slack', require('./slack'));
router.use('/health', require('./health'));
router.use('/home', require('./home'));

module.exports = router;
