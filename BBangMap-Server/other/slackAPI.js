const axios = require('axios');

const dotenv = require('dotenv');

dotenv.config();

const DEV_WEB_HOOK_ERROR_MONITORING = process.env.DEV_WEB_HOOK_ERROR_MONITORING;

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
