const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const authService = require('../service');
const slack = require('../../../other/slackAPI');

module.exports = {
  authLogin: async (req, res) => {
    try {
      const { identifyToken, provider } = req.body;
      // identifyToken, authorizationCode를 제외한 필드는 optional
      const loginDto = await authService.authLogin(identifyToken, provider);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LOGIN, loginDto));
    } catch (err) {
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.message));
    }
  },
  logout: async (req, res) => {
    try {
      const { user } = req.header;
      await authService.logout(user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LOGOUT));
    } catch (err) {
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.message));
    }
  },
  reissue: async (req, res) => {
    try {
      const { accessToken } = req.body;
      const loginDto = await authService.reissueToken(accessToken);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_REISSUE_TOKEN, loginDto));
    } catch (err) {
      if (err.message === 'InvalidAccessToken') {
        const slackMessage = `[ERROR 발생 🚨] [${req.method.toUpperCase()}] ${req.originalUrl} ${err} ${JSON.stringify(
          err,
        )}`;
        console.log(err);
        slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else return res.status(err.statusCode).send(util.fail(err.statusCode, err.message));
    }
  },
};
