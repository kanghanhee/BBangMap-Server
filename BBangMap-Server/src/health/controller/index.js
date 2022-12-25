const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  getHealth: async (req, res) => {
    try {  
        return res
            .status(statusCode.OK)
            .send(util.success(statusCode.OK, "OK", ""));
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.fail(statusCode.INTERNAL_SERVER_ERROR,err,""));
        }
    }
};
