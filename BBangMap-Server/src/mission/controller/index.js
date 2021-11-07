const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const missionService = require('../service')

module.exports = {
    createMission: async (req, res) => {
        try {
            const {
                missionTitle,
                missionContent,
                missionDate,
                badgeImg
            } = req.body;
            const {
                bakeryList
            } = req.body;
            const result = await missionService.postMission(missionTitle, missionContent, missionDate, badgeImg, bakeryList);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_MISSION, result));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    },
    monthlyMission: async (req, res) => {
        try {
            //uuid check 
            let user = req.header.user;
            const result = await missionService.getMonthlyMission(user);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_MONTHLY_MISSION, result));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }



}