const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  requestBakerySearch: async (req, res) => {
    try {
      const { keyword } = req.query;
      const result = await bakeryService.getSearchRequestBakeryList(keyword);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_SEARCH_REQUEST_BAKERY, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
