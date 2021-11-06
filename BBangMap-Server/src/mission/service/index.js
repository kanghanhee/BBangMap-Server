const createMissonBakeryDto = require('../dto/createMissonBakeryDto')
const Mission = require('../model/index')
const MissionBakery = require('../model/MissionBakery')

module.exports = {
    //미션 추가
    postMission: async (missionTitle, missionContent, missionDate, badgeImg, bakeryList) => {
        try {
            const mission = await Mission.create({
                missionTitle: missionTitle,
                missionContent: missionContent,
                missionDate: missionDate,
                badgeImg: badgeImg
            });

            // const missionBakeryList = (bakeryList.map(bakeryId => {
            //     new MissionBakery(createMissonBakeryDto(mission, bakeryId))
            // }))
            // await missionBakeryList.save();
        } catch (err) {
            console.error();
        }

    }
}