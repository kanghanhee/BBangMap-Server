const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const authService = require('../service');

module.exports = {
    authLogin: async (req, res) => {
        try{
            const {appleUserInfo, provider} = req.body;
            //identifyToken, authorizationCode를 제외한 필드는 optional
            const loginDto = await authService.authLogin(appleUserInfo, provider);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_APPLE_LOGIN, loginDto));
        }catch(err){
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    },
    logout: async(req,res)=>{
        try{
            const {user} = req.header;
            await authService.logout(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_APPLE_LOGIN));
        }catch(err){
            return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
        }
    }
}