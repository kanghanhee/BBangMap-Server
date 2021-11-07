const missionUtil = require('../util')
const MonthlyMissionDto = require('../dto/monthlyMissionDto');
const badgeListDto = require('../dto/badgeListDto')
const {
    findUserSucceededMission
} = require('../util');
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
    },

    getMonthlyMission: async (user) => {
        try {
            //미션정보
            const mission = await missionUtil.findMissionByDate();
            // if mission ==null
            //미션 빵집 정보
            const missionBakery = await missionUtil.findMissionBakeryByMission(mission.id);
            console.log(missionBakery);
            //사용자가 이달의 빵집 달성했는지
            const visitedBakeryList = await missionUtil.isVisitedBakery(user, mission.id);
            console.log(visitedBakeryList);
            //사용자 이달의 빵집 달성 개수
            const successCount = visitedBakeryList.length;
            //전체 미션 아이디, 배지 이미지
            const succeededMission = this.getUserSucceededMission(user);
            //dto
            // getMonthlyMission(mission,missionBakery,visitedBakeryList,successCount,BadgeList);
        } catch (err) {
            console.error();
        }
    },
    //사용자가 달성한 미션
    getUserSucceededMission: async (user) => {
        try {
            const succeededMission = await findUserSucceededMission(user);
            const badgeList = await succeededMission.map(MissionId =>
                badgeListDto(missionUtil.findMissionById(MissionId))
            )
            return badgeList;
        } catch (error) {
            console.error()
        }
    }

    //미션 삭제

    //이달의 미션



}