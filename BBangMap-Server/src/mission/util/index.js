const {
    Mission,
    MissionBakery
} = require('../../../models')
const {
    Op
} = require('sequelize')

module.exports = {
    createMission: async (missionTitle, missionContent, missionDate, badgeImg) => {
        return await Mission.create({
            missionTitle: missionTitle,
            missionContent: missionContent,
            missionDate: new Date(missionDate),
            badgeImg: badgeImg
        })
    },
    createMissionBakery: async (missionId, bakeryId) => {
        await MissionBakery.create({
            MissionId: missionId,
            BakeryId: bakeryId
        })
    }
}