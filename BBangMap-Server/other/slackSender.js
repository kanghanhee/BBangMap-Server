const slack = require('./slackAPI');

const sendError = (statusCode, errorMessage, errorUrl, error) => {
  const slackMessage = `[ERROR 발생 🚨][ErrorCode : ${statusCode}] [${errorMessage}] ${errorUrl} ${error} ${JSON.stringify(
    error,
  )}`;
  slack.sendMessage(slackMessage, slack.DEV_WEB_HOOK_ERROR_MONITORING);
};

module.exports = { sendError };
