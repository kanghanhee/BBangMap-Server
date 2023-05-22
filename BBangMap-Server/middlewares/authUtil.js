const jwt = require('../modules/jwt')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/util')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const userUtil = require('../src/user/util')

const authUtil = {
    checkToken: async (req, res, next) => {
        let token = req.headers.token;

        if(!token)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));

        const decode = await jwt.verify(token);

        if(decode === TOKEN_EXPIRED)
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
        if(decode === TOKEN_INVALID)
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        if(decode.id === undefined)
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));

        const user = await userUtil.findUserById(decode.id);

        if(user == null)
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_USER));

        // req.header.user = user;
        res.locals.user = user;
        next();
    },
    checkAdminToken: async(req,res,next)=>{
        if(req.header.user.role !== 1){
            return res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.FORBIDDEN, responseMessage.INVALID_USER));
        }
        next();
    }
}

module.exports = authUtil;