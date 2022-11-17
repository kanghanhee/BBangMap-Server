const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');

module.exports = {
    changeImageUrl: async (req, res) => {
        const imageArr = req.files.map((f)=>f.location);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_IMAGE,imageArr));
    }
}