const express = require('express')

const router = express.Router()
const curationController = require('../../src/curation/controller')
const authUtil = require('../../middlewares/authUtil')
const curationUpload = require('../../modules/multer/curationMulter')

// router.post('/', authUtil.checkToken, authUtil.checkAdminToken, curationUpload.single('curationImage'), curationController.addCuration)
router.get('/',authUtil.checkToken, curationController.curationListByCurationContents)
router.get('/detail', authUtil.checkToken, curationController.curationDetail)
router.post('/:curationId/like', authUtil.checkToken, curationController.likeCuration)
router.delete('/:curationId/like', authUtil.checkToken, curationController.cancelLikeCuration)
router.get('/:curationId/bakery/location',authUtil.checkToken, curationController.bakeryLocationInfo)

module.exports = router;