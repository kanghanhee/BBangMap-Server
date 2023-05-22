/* eslint-disable consistent-return */
const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const userService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
    // 회원가입
    signUp: async (req, res) => {
        try {
            const {uuid, nickname} = req.body;
            await userService.signUp(uuid, nickname);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SIGN_UP));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    // 프로필 수정
    updateUser: async (req, res) => {
        try {
            const user = res.locals.user;

            let profileImgName = '';
            let bgImgName = '';
            let nickname = '';
            if (req.files.profileImg) profileImgName = req.files.profileImg[0].location;
            if (req.files.backgroundImg) bgImgName = req.files.backgroundImg[0].location;
            if (req.body.nickname) nickname = req.body.nickname;

            if (req.body.isProfileImageDefault) profileImgName = 'default';
            if (req.body.isBackgroundImageDefault) bgImgName = 'default';

            const result = await userService.updateUser(user, profileImgName, bgImgName, nickname);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_USER, result));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    // 프로필 삭제
    deleteUser: async (req, res) => {
        try {
            const user = res.locals.user;
            const result = await userService.deleteUser(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_USER, result));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    // 닉네임 중복검사
    checkNickname: async (req, res) => {
        try {
            const {nickname} = req.body;
            const result = await userService.checkNickname(nickname);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_VERIFY_NICKNAME, result));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    // 랜덤 닉네임
    randomNickname: async (req, res) => {
        try {
            const user = res.locals.user;
            const result = await userService.createRandomNickname(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_NICKNAME, result));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    // 마이페이지
    getMyPage: async (req, res) => {
        try {
            const user = res.locals.user;
            const result = await userService.readMyPage(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_MY_PAGE, result));
        } catch (err) {
            if (err.statusCode == null) {
                err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
            }
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    getUserInfo: async (req, res) => {
        try{
            const {nickname} = req.query;
            const result = await userService.getUserInfo(nickname);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_USER_INFO, result));
        }catch(err){
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    getMyPageV2: async (req, res) => {
        try{
            const user = res.locals.user;
            const result = await userService.readMyPageV2(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_MY_PAGE, result))
        } catch (err) {
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    updateVisitReward: async (req, res) => {
        try{
            const user = res.locals.user;
            const result = await userService.updateVisitReward(user);
            if(!result) {
                return res.status(statusCode.OK).send(util.success(statusCode.BAD_REQUEST, responseMessage.FAIL_UPDATE_REWARD))
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_REWARD));
        } catch (err) {
            slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }
};
