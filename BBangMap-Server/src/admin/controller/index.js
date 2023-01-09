const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const slackSender = require('../../../other/slackSender');
const adminService = require('../service');

module.exports = {
    changeImageUrl: async (req, res) => {
        try {
            const imageArr = req.files.map((f) => f.location);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_IMAGE, imageArr));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    researchCount: async (req, res) => {
        try {
            const result = await adminService.researchCount();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RESEARCH_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    likeCountOfReview: async (req, res) => {
        try{
            const result = await adminService.likeCountOfReview();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_LIKE_REVIEW_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    saveCountOfReview: async (req, res) => {
        try{
            const result = await adminService.saveCountOfReview();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SAVE_REVIEW_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    likeCountOfCuration: async (req, res) => {
        try{
            const result = await adminService.likeCountOfCuration();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_LIKE_CURATION_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    saveCountOfBakery: async (req, res) => {
        try{
            const result = await adminService.saveCountOfBakery();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SAVE_BAKERY_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    visitCountOfBakery: async (req, res) => {
        try{
            const result = await adminService.visitCountOfBakery();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_VISITED_BAKERY_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    joinCountOfUser: async (req, res) => {
        try{
            const result = await adminService.joinCountOfUser();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_JOIN_USER_COUNT, result));
        }catch(err){
            slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    }
}