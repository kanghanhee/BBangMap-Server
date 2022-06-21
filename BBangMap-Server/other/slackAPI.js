const axios = require('axios');
const {DEV_WEB_HOOK_ERROR_MONITORING} = require('../config/slack');
const sendMessage = (message, apiEndPoint = DEV_WEB_HOOK_ERROR_MONITORING) => {
  try {
    axios
      .post(apiEndPoint, { text: message })
      .then(response => {})
      .catch(e => {
        throw e;
      });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { sendMessage, DEV_WEB_HOOK_ERROR_MONITORING };
