const missionUtil = require("../util");
const
    missionMainDto = require('../dto/missionMainDto');
const
    missionBakeryDto = require("../dto/missionBakeryDto");
const
    createMissionBakeryDto = require('../dto/createMissionBakeryDto');
const
    checkSucceededMissionDto = require('../dto/checkSucceededMissionDto');
const
    badgeListDto = require('../dto/badgeListDto');
const
    userSucceededMissionDto = require("../dto/userSucceededMissionDto");
const
    monthlyMissionDto = require("../dto/monthlyMissionDto");
// const
//    { findBakeryByBakeryId } = require("../util");
module.exports = {
    //미션 추가
    postMission: async (
        missionTitle,
        missionContent,
        missionDate,
        badgeImg,
        bakeryList
    ) => {
        const mission = await missionUtil.createMission(
            missionTitle,
            missionContent,
            new Date(missionDate),
            badgeImg
        );

        await bakeryList.map((bakery) =>
            missionUtil.createMissionBakery(mission.id, bakery.bakeryId)
        );
    },
    //미션 삭제
    //미션 메인페이지
    getMissionMain: async (user) => {
        try {
            const mission = await missionUtil.findMissionByDate();
            // if mission ==null -> throw err
            const missionBakeryList = await missionUtil.findMissionBakeryByMission(
                mission.id
            );

            let missionAchieveCount = 0;
            let bakeryListInfo = await Promise.all(missionBakeryList.map(async (bakery) => {
                let bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
                let isSucceeded = await missionUtil.isVisitedBakery(user, bakery.BakeryId)
                if (isSucceeded == true) missionAchieveCount++;
                return missionBakeryDto(bakeryInfo, isSucceeded) //dto로 bakeryInfo,isSucceeded return
            }))

            const monthlyMission = monthlyMissionDto(mission);

            const succeededMissionList = await missionUtil.findUserSucceededMission(user);
            const badgeList = await Promise.all(succeededMissionList.map(async (mission) => {
                const missionInfo = await missionUtil.findMissionById(mission.MissionId)
                return badgeListDto(missionInfo)
            }))

            if (badgeList == null) {
                badgeList = {}
            }
            console.log(badgeList)

            return missionMainDto(
                monthlyMission,
                bakeryListInfo,
                badgeList,
                missionAchieveCount
            );
        } catch (err) {
            console.log(err)
        }
    },
    //사용자가 달성한 미션
    getUserSucceededMission: async (user, missionId) => {
        const missionInfo = await missionUtil.findMissionById(missionId)
        let isVisitedList;
        const missionBakeryList = await missionUtil.findMissionBakeryByMission(missionId)

        await Promise.all(missionBakeryList.map(async (bakery) => {
            let bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
            let isVisited = await missionUtil.isVisitedBakery(user, bakery.BakeryId)
            if (isVisited) isVisitedList.push(bakeryInfo.bakeryName)
        }))
        if (isVisitedList == null) {
            isVisitedList = {}
        }
        return userSucceededMissionDto(missionInfo, isVisitedList);
    },

    // //미션 달성시 체크(후기 들어올때마다 후기개수&미션빵집 체크 -> 미션 빵집인지, 미션달성했는지,등급)
    // checkSucceededMission: async (user, bakeryId) => {
    //     try {
    //         const mission = await missionUtil.findMissionByDate();
    //         //빵집이 미션빵집인지 체크 Util
    //         const isMissionBakery = await missionUtil.isMissionBakery(
    //             mission,
    //             bakeryId
    //         );
    //         // 사용자 빵집이 미션달성했는지 체크
    //         const isSucceededMission = await missionUtil.isSucceededMission(
    //             user,
    //             mission.id
    //         );
    //         //등급산정 Util(후기개수, 미션빵집)
    //         const rank = await missionUtil.calculateRank(user)

    //         return await checkSucceededMissionDto(isMissionBakery, isSucceededMission, rank)
    //     } catch (err) {
    //         console.error();
    //     }
    // },
    //나의 등급
    getUserRank: async (user) => {
        const userMissionCount = await missionUtil.findUserSucceededMission(user);
        const userReviewCount = await missionUtil.findUserReview(user);

        // const userRank= user.rank
        // const calculated = await missionUtil.calculateRank(userMissionCount.count, userReviewCount.count);
        const calculated = await missionUtil.calculateGrade(20, 20);

        if (user.grade !== calculated.grade) {
            try {
                await missionUtil.updateUserGrade(user, calculated.grade)
            } catch (err) {
                console.log(err)
            }
        }
        console.log(calculated)
        return calculated
    }
};