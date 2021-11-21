const responseMessage = require('../modules/responseMessage')
const util = require('../modules/util')
const statusCode = require('../modules/statusCode')
const uuidUtil = require('../modules/uuidUtil')

const authUtil = {
    checkUuid: async (req, res, next) => {
        var uuid = req.headers.uuid;

        var user = await uuidUtil.validUuId(uuid);

        if (user == null) res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_UUID));

        req.header.user = user;

        next();
    },
    validAdmin: async (req, res, next) => {
        var uuid = req.headers.uuid;

        var user = await uuidUtil.validUuId(uuid);

        if (user == null) res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_UUID));

        if (user.role != 0) res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UNAUTHORIZED));

        req.header.user = user;

        next();
    }
}

module.exports = authUtil;