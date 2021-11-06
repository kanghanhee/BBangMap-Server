const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const missionService = require('../../mission/service/index')

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
            // console.log("제목", bakeryList[0].bakeryId);
            await missionService.postMission(missionTitle, missionContent, missionDate, badgeImg, bakeryList);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NULL_VALUE, missionTitle));
        } catch (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }
}