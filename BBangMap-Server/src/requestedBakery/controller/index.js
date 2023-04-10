const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  requestBakerySearch: async (req, res) => {
    try {
      const { keyword } = req.query;
      const result = await bakeryService.getSearchRequestedBakeryList(keyword);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_SEARCH_REQUEST_BAKERY, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  requestedBakery: async (req, res) => {
    try {
      const { user } = req.header;
      const { bakeryId, bakeryName, reason } = req.body;
      if (reason == null)
        throw {
          statusCode: statusCode.BAD_REQUEST,
          responseMessage: responseMessage.NULL_VALUE,
        };

      await bakeryService.saveRequestedBakery(user, bakeryId, bakeryName, reason);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REQUEST_BAKERY, null));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
        slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  getRequestedBakeryList: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await bakeryService.getRequestedBakeryList();
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REQUEST_BAKERY, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  getRequestedBakeryListByUserId: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await bakeryService.getRequestedBakeryListByUserId(user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REQUEST_BAKERY, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  changeRequestBakeryStatus: async (req, res) => {
    try {
      const { bakeryId, isAccept } = req.body;
      const result = await bakeryService.changeRequestBakeryStatus(bakeryId, isAccept);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_REQUEST_BAKERY_STATUS, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  requestBakeryVerifiedToRequest: async (req,res) => {
    try{
      const {placeId} = req.params;
      if( await bakeryService.requestBakeryVerifiedToRequest(placeId) ){
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_REQUEST_BAKERY_STATUS));
      } else {
        return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FAIL_UPDATE_REQUEST_BAKERY_STATUS));
      }
    } catch (err) {
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  }
};
