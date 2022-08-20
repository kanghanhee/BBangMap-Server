const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');
const slackService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  getRequestedBakeryList: async (req, res) => {
    try {
      const data = await slackService.getRequestedBakeryList();
      return res.json(data);
    } catch (err) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
