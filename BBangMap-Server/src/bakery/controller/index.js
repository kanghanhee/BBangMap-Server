const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service');

module.exports = {
    bakeryMap: async (req, res) => {
        try {
            const {latitude, longitude, radius} = req.query;
            const {user} = req.header;
            const bakeryMapListDto = await bakeryService.getBakeryMap(user, latitude, longitude, radius);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryMapListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    bakerySearch: async (req, res) => {
        try {
            const {bakeryName, latitude, longitude} = req.query;
            const {user} = req.header;
            const bakerySearchListDto = await bakeryService.getSearchBakeryList(bakeryName, latitude, longitude, user);
            res
                .status(statusCode.OK)
                .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    bakeryDetail: async (req, res) => {
        try {
            const {bakeryId} = req.query;
            const {user} = req.header;
            const bakeryDetailDto = await bakeryService.getBakeryDetail(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryDetailDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    bakeryImgList: async (req, res) => {
        try {
            const {bakeryId} = req.query;
            const bakeryImgListDto = await bakeryService.getBakeryImgList(bakeryId);
            res
                .status(statusCode.OK)
                .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, bakeryImgListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    storedBakeryList: async (req, res) => {
        try {
            const {user} = req.header;
            const savedBakeryListDto = await bakeryService.getSavedBakeryList(user);
            res
                .status(statusCode.OK)
                .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, savedBakeryListDto));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    storeBakery: async (req, res) => {
        try {
            const {bakeryId} = req.params;
            const {user} = req.header;
            await bakeryService.savedBakery(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_BAKERY));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    unStoreBakery: async (req, res) => {
        try {
            const {bakeryId} = req.params;
            const {user} = req.header;
            await bakeryService.deleteSaveBakery(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_BAKERY));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    registerBakery: async (req, res) => {
        try {
            const {body} = req;
            await bakeryService.createBakery(body);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTRATION_BAKERY));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
};
