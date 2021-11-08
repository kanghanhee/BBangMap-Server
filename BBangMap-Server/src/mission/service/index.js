const missionUtil = require("../util");
const {
    userSucceededMissionDto,
    monthlyMissionDto,
    missionMainDto,
    badgeListDto,
    checkSucceededMissionDto
} = require("../dto");
module.exports = {
    //미션 추가
    postMission: async (
        missionTitle,
        missionContent,
        missionDate,
        badgeImg,
        bakeryList
    ) => {
        try {
            const mission = await missionUtil.createMission(
                missionTitle,
                missionContent,
                new Date(missionDate),
                badgeImg
            );
            console.log("mission", mission.id); //mission undefined

            await bakeryList.map((bakery) =>
                // console.log(bakery.bakeryId))
                missionUtil.createMissionBakery(mission.id, bakery.bakeryId)
            );
        } catch (err) {
            console.error();
        }
    },
    //미션 삭제
    //미션 메인페이지
    getMissionMain: async (user) => {
        try {
            const monthlyMission = await this.getMonthlyMission();
            const visitedBakeryList = await missionUtil.isVisitedMissionBakery(
                user,
                mission.id
            );
            const badgeList = this.getUserSucceededMission(user);

            return missionMainDto(
                monthlyMission,
                visitedBakeryList,
                badgeListDto(badgeList)
            );
        } catch (err) {
            console.error();
        }
    },
    //이달의 미션 & 미션 빵집
    getMonthlyMission: async () => {
        try {
            const mission = await missionUtil.findMissionByDate();
            // if mission ==null -> throw err
            const missionBakery = await missionUtil.findMissionBakeryByMission(
                mission.id
            );
            return monthlyMissionDto(mission, missionBakery);
        } catch (err) {
            console.err();
        }
    },
    //사용자가 달성한 미션
    getUserSucceededMission: async (user, missionId) => {
        try {
            const visitedBakeryList = await missionUtil.isVisitedMissionBakery(
                user,
                missionId
            );
            const mission = await missionUtil.findMissionById(missionId);
            return userSucceededMissionDto(mission, visitedBakeryList);
        } catch (error) {
            console.error();
        }
    },

    //미션 달성시 체크(후기 들어올때마다 후기개수&미션빵집 체크 -> 미션 빵집인지, 미션달성했는지,등급)
    checkSucceededMission: async (user, bakeryId) => {
        try {
            const mission = await missionUtil.findMissionByDate();
            //빵집이 미션빵집인지 체크 Util
            const isMissionBakery = await missionUtil.isMissionBakery(
                mission,
                bakeryId
            );
            // 사용자 빵집이 미션달성했는지 체크
            const isSucceededMission = await missionUtil.isSucceededMission(
                user,
                mission.id
            );
            //등급산정 Util(후기개수, 미션빵집)
            const rank = await missionUtil.calculateRank(user)

            return checkSucceededMissionDto(isMissionBakery, isSucceededMission, rank)
        } catch (err) {
            console.error();
        }
    },
    //나의 등급
    getUserRank: async (user) => {
        try {
            return missionUtil.calculateRank(user);
        } catch (err) {
            console.error()
        }
    }
};