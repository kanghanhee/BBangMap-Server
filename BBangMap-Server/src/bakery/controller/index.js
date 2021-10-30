const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');

module.exports = {
    example:async (req,res)=>{
        try{
            var test = {
                "bakeryId" : 1,
                "latitude" : 0.5,
                "longitude" : 5.1,
                "isSaveBakery" :true
            }
            var test2 = {
                "bakeryId" : 1,
                "latitude" : 0.5,
                "longitude" : 5.1,
                "isSaveBakery" :true
            }
            var data = [];
            data.push(test);
            data.push(test2);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NULL_VALUE, data));
        }catch(err){
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }
}