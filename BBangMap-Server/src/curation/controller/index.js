const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const curationService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
    addCuration: async (req, res) => {
        try {
            await curationService.addCuration(req.body, req.file);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_CURATION));
        } catch (err) {
            if (err.message === 'NOT_FOUND_CURATION_CONTENT' || err.message === 'CURATION_IMAGE_REQUIRE') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },

    curationListByCurationContents: async (req, res) => {
        try {
            const user = req.header.user;
            const result = await curationService.getCurationListWithCurationContent(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        } catch (err) {
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    curationDetail: async (req, res) => {
        try {
            const user = req.header.user;
            const {curationId} = req.query;
            const result = await curationService.getCurationDetail(user.id, curationId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        } catch (err) {
            if (err.message === 'NOT_FOUND_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    likeCuration: async (req, res) => {
        const user = req.header.user;
        const {curationId} = req.params;
        try {
            await curationService.likeCuration(user.id, curationId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LIKE_CURATION));
        } catch (err) {
            if (err.message === 'NOT_FOUND_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if (err.message === 'ALREADY_LIKE_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    cancelLikeCuration: async (req, res) => {
        const user = req.header.user;
        const {curationId} = req.params;
        try {
            await curationService.cancelLikeCuration(user.id, curationId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNLIKE_CURATION));
        } catch (err) {
            if (err.message === 'NOT_FOUND_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if (err.message === 'ALREADY_UNLIKE_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    bakeryLocationInfo: async (req, res) => {
        const {user} = req.header;
        const {curationId} = req.params;
        try {
            const result = await curationService.getBakeryLocationInfo(user.id, curationId);
            return res
                .status(statusCode.OK)
                .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LOCATION_INFO, result));
        } catch (err) {
            if (err.message === 'NOT_FOUND_CURATION') {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    getCurationListByAdmin: async (req, res) => {
        try{
            const result = await curationService.getCurationListByAdmin();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        }catch(err){
            // slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    getCurationContent: async (req, res) => {
        try {
            const result = await curationService.getCurationContent();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION_CONTENT, result));
        } catch (err) {
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    updateCuration: async (req, res) => {
        try {
            const {curationId} = req.params;
            await curationService.updateCuration(curationId, req.body);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_CURATION));
        } catch (err) {
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    updateCurationPriority: async (req, res) => {
        try {
            const curationList = req.body;
            const {curationContentId} = req.params;
            await curationService.updateCurationPriority(curationList, curationContentId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_PUT_CURATION_PRIORITY));
        } catch (err) {
            console.log(err.message)
            if (err.message === "Error: INVALID_PRIORITY") {
                slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    }
};
