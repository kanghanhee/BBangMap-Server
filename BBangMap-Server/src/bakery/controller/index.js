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
    bakeryLocation: async (req, res) => {
        try {
            const {bakeryId} = req.params;
            const {user} = req.header;
            const bakeryLocationInfo = await bakeryService.bakeryLocation(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LOCATION_INFO, bakeryLocationInfo));
        } catch (err) {
            //빵집 없을때 예외처리
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    doBakeryVisited: async (req, res) => {
        try {
            const {bakeryId} = req.params;
            const {user} = req.header;
            await bakeryService.doBakeryVisited(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_VISITED_BAKERY));
        } catch (err) {
            if (err.message === "NOT_EXIST_BAKERY") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if(err.message === "ALREADY_BAKERY_VISITED"){
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            }else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    cancelBakeryVisited: async (req, res) => {
        try {
            const {bakeryId} = req.params;
            const {user} = req.header;
            await bakeryService.cancelBakeryVisited(bakeryId, user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CANCEL_VISITED_BAKERY));
        } catch (err) {
            if (err.message === "NOT_EXIST_BAKERY") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if(err.message === "ALREADY_CANCEL_BAKERY_VISITED"){
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            }else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    }
};
