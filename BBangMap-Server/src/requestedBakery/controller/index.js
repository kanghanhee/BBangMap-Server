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
      res
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
      const { bakeryId, bakeryName } = req.body;
      await bakeryService.saveRequestedBakery(user, bakeryId, bakeryName);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REQUEST_BAKERY, null));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  getRequestedBakeryList: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await bakeryService.getRequestedBakeryList(user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REQUEST_BAKERY, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
};
