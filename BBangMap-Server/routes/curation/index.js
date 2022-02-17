const express = require('express')

const router = express.Router()
const curationController = require('../../src/curation/controller')
const authUtil = require('../../middlewares/authUtil')

router.post('/', authUtil.checkToken, authUtil.checkAdminToken, curationController.addCuration)

module.exports = router;