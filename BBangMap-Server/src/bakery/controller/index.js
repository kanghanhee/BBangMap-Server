const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service')

module.exports = {
    bakeryMap: async (req, res) => {
        try {
            let {latitude, longitude} = req.query;
            let user = req.header.user;
            let bakeryMapListDto = await bakeryService.getBakeryMap(user, latitude, longitude);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryMapListDto))
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message))
        }
    },
    bakerySearch: async (req, res) => {
        try {
            let {bakeryName} = req.query;
            let bakerySearchListDto = await bakeryService.getSearchBakeryList(bakeryName);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    bakeryDetail: async (req, res) => {
        try {
            let {bakeryId} = req.query;
            let user = req.header.user;
            let bakeryDetailDto = await bakeryService.getBakeryDetail(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryDetailDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    bakeryImgList: async (req, res) => {
        try {
            let {bakeryId} = req.query;
            let bakeryImgListDto = await bakeryService.getBakeryImgList(bakeryId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, bakeryImgListDto))
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    savedBakeryList: async (req, res) => {
        try {
            let user = req.header.user;
            let savedBakeryListDto = await bakeryService.getSavedBakeryList(user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, savedBakeryListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    }
}