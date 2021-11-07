const {
    Mission
} = require('../../../models')
const {
    MissionBakery
} = require('../../../models')
const missionUtil = require('../util')

module.exports = {
    //미션 추가
    postMission: async (missionTitle, missionContent, missionDate, badgeImg, bakeryList) => {
        try {
            const mission = await missionUtil.createMission(missionTitle, missionContent, new Date(missionDate), badgeImg)
            console.log("mission", mission.id); //mission undefined

            await bakeryList.map(bakery =>
                // console.log(bakery.bakeryId))
                missionUtil.createMissionBakery(mission.id, bakery.bakeryId))

        } catch (err) {
            console.error();
        }
    }

    //미션 삭제

    //이달의 미션
    //uuid


}