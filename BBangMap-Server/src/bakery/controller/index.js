const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service')

module.exports = {
    bakeryMap: async (req, res) => {
        try {
            let {latitude, longitude} = req.query;
            let user = req.header.user;
            let bakeryList = await bakeryService.getBakeryMap(user, latitude, longitude);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryList))
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message))
        }
    },
    searchBakery: async (req, res) => {
        try {
            let {bakeryName} = req.query;
            let bakeryList = await bakeryService.getSearchBakeryList(bakeryName);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryList));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    }
}