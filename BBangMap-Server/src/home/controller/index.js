const statusCode = require('../../../modules/statusCode');
const util = require('../../../modules/util');
const slackSender = require('../../../other/slackSender');
const homeService = require('../service');

module.exports = {
  getHomeList: async (req, res) => {
    try {
      const { redis } = req;
      const { user } = res.locals;
      const data = await homeService.getHomeDataList(redis, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, 'success', data));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
