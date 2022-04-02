const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const curationService = require('../service');
const slack = require('../../../other/slackAPI');

module.exports = {
  addCuration: async (req, res) => {
    try {
      let user = req.header.user;
      await curationService.addCuration(user, req.body, req.file);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_CURATION));
    } catch (err) {
      if (err.message === 'NOT_FOUND_CURATION_CONTENT' && err.message === 'CURATION_IMAGE_REQUIRE') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${
          statusCode.INTERNAL_SERVER_ERROR
        }] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },

    curationListByCurationContents: async (req, res) => {
        try {
            const user = req.header.user;
            const result = await curationService.getCurationList(user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
    },
    curationDetail: async (req, res) => {
        try {
            const user = req.header.user
            const {curationId} = req.query
            const result = await curationService.getCurationDetail(user.id, curationId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
        } catch (err) {
            if (err.message === "NOT_FOUND_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    likeCuration: async (req, res) => {
        const user = req.header.user
        const {curationId} = req.params
        try {
            await curationService.likeCuration(user.id, curationId)
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LIKE_CURATION));
        } catch (err) {
            if (err.message === "NOT_FOUND_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if (err.message === "ALREADY_LIKE_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    cancelLikeCuration: async (req, res) => {
        const user = req.header.user;
        const {curationId} = req.params;
        try {
            await curationService.cancelLikeCuration(user.id, curationId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNLIKE_CURATION));
        } catch (err) {
            if (err.message === "NOT_FOUND_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else if (err.message === "ALREADY_UNLIKE_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    },
    bakeryLocationInfo: async (req, res) => {
        const {user} = req.header;
        const {curationId} = req.params;
        try{
            const result = await curationService.getBakeryLocationInfo(user.id, curationId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LOCATION_INFO, result));
        }catch(err){
            if (err.message === "NOT_FOUND_CURATION") {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
            }else{
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
            }
        }
    }
  },
  curationDetail: async (req, res) => {
    try {
      const user = req.header.user;
      const { curationId } = req.query;
      const result = await curationService.getCurationDetail(user.id, curationId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_CURATION, result));
    } catch (err) {
      if (err.message === 'NOT_FOUND_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${
          statusCode.INTERNAL_SERVER_ERROR
        }] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  likeCuration: async (req, res) => {
    const user = req.header.user;
    const { curationId } = req.params;
    try {
      await curationService.likeCuration(user.id, curationId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LIKE_CURATION));
    } catch (err) {
      if (err.message === 'NOT_FOUND_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else if (err.message === 'ALREADY_LIKE_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${
          statusCode.INTERNAL_SERVER_ERROR
        }] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  cancelLikeCuration: async (req, res) => {
    const user = req.header.user;
    const { curationId } = req.params;
    try {
      await curationService.cancelLikeCuration(user.id, curationId);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNLIKE_CURATION));
    } catch (err) {
      if (err.message === 'NOT_FOUND_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else if (err.message === 'ALREADY_UNLIKE_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${
          statusCode.INTERNAL_SERVER_ERROR
        }] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  bakeryLocationInfo: async (req, res) => {
    const { user } = req.header;
    const { curationId } = req.params;
    try {
      const result = await curationService.getBakeryLocationInfo(user.id, curationId);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LOCATION_INFO, result));
    } catch (err) {
      if (err.message === 'NOT_FOUND_CURATION') {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode.BAD_REQUEST}] [${req.method.toUpperCase()}] ${
          req.originalUrl
        } ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${
          statusCode.INTERNAL_SERVER_ERROR
        }] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(err)}`;
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
};
