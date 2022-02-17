const util = require('../../../modules/util')
const statusCode = require('../../../modules/statusCode')
const responseMessage = require('../../../modules/responseMessage')
const curationService = require('../service')

module.exports = {
    addCuration: async (req, res) => {
        try{
            let user = req.header.user;
            await curationService.addCuration(user, req.body);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_CURATION));
        }catch(err){
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    }
}