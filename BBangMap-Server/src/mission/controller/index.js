/* eslint-disable consistent-return */
const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const missionService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  createMission: async (req, res) => {
    try {
      const { missionTitle, missionContent, missionDate, badgeImg } = req.body;
      const { bakeryList } = req.body;
      const result = await missionService.postMission(missionTitle, missionContent, missionDate, badgeImg, bakeryList);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_MISSION, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
  missionMain: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await missionService.getMissionMain(user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_MONTHLY_MISSION, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  missionSucceeded: async (req, res) => {
    try {
      const { user } = req.header;
      const { missionId } = req.params;
      const result = await missionService.getUserSucceededMission(user, missionId);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_SUCCEEDED_MISSION, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  userRank: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await missionService.getUserRank(user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_USER_RANK, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
  checkRank: async (req, res) => {
    try {
      const { user } = req.header;
      const { bakeryId } = req.params;
      const { reviewId } = req.body;
      const result = await missionService.checkSucceededMission(user, bakeryId, reviewId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_USER_RANK, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
};
