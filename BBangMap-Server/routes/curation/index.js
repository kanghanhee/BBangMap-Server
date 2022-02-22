const express = require('express')

const router = express.Router()
const curationController = require('../../src/curation/controller')
const authUtil = require('../../middlewares/authUtil')
const curationUpload = require('../../modules/multer/curationMulter')

router.post('/', authUtil.checkToken, authUtil.checkAdminToken, curationUpload.single('curationImage'), curationController.addCuration)
router.get('/',authUtil.checkToken, curationController.curationListByCurationContents)
router.get('/detail', authUtil.checkToken, curationController.curationDetail)
router.put('/like', authUtil.checkToken, curationController.likeCuration)

module.exports = router;