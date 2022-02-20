const util = require('../../../modules/util')
const statusCode = require('../../../modules/statusCode')
const responseMessage = require('../../../modules/responseMessage')
const curationService = require('../service')

module.exports = {
    addCuration: async (req, res) => {
        try {
            let user = req.header.user;
            await curationService.addCuration(user, req.body, req.file);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_CURATION));
        } catch (err) {
            if (err.message === "NOT_FOUND_CURATION_CONTENT" && err.message === "CURATION_IMAGE_REQUIRE") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },

    curationListByCurationContents: async (req, res) => {
        try {
            const result = await curationService.getCurationList()
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    curationDetail: async (req, res) => {
        try{
            const user = req.header.user
            const {curationId} = req.query
            console.log('curationId : ',curationId)
            const result = await curationService.getCurationDetail(user.id, curationId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        }catch (err){
            if(err.message === "NOT_FOUND_CURATION"){
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            }
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    }
}