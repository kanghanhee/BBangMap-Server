const missionUtil = require("../util");
const missionMainDto = require("../dto/missionMainDto");
const missionBakeryDto = require("../dto/missionBakeryDto");
const createMissionBakeryDto = require("../dto/createMissionBakeryDto");
const checkSucceededMissionDto = require("../dto/checkSucceededMissionDto");
const badgeListDto = require("../dto/badgeListDto");
const userSucceededMissionDto = require("../dto/userSucceededMissionDto");
const monthlyMissionDto = require("../dto/monthlyMissionDto");
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

      let missionAchieveCount = await missionUtil.getMissionAcheiveCount(
        user,
        mission.id
      );
      let bakeryListInfo = await Promise.all(
        missionBakeryList.map(async (bakery) => {
          let bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
          let isSucceeded = await missionUtil.isVisitedBakery(
            user,
            bakery.BakeryId
          );
          return missionBakeryDto(bakeryInfo, isSucceeded);
        })
      );

      const monthlyMission = monthlyMissionDto(mission);
      const succeededMissionList = await missionUtil.findUserSucceededMission(
        user
      );

      let badgeList;
      for (i = 0; i < succeededMissionList.length; i++) {
        const missionInfo = await missionUtil.findMissionById(
          succeededMissionList[i].MissionId
        );
        badgeList.push(badgeListDto(missionInfo));
      }

      if (badgeList == null) {
        badgeList = {};
      }
      console.log(badgeList);

      return missionMainDto(
        monthlyMission,
        bakeryListInfo,
        badgeList,
        missionAchieveCount
      );
    } catch (err) {
      console.log(err);
    }
  },
  //사용자가 달성한 미션
  getUserSucceededMission: async (user, missionId) => {
    const missionInfo = await missionUtil.findMissionById(missionId);
    let isVisitedList;
    const missionBakeryList = await missionUtil.findMissionBakeryByMission(
      missionId
    );

    await Promise.all(
      missionBakeryList.map(async (bakery) => {
        let bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
        let isVisited = await missionUtil.isVisitedBakery(
          user,
          bakery.BakeryId
        );
        if (isVisited) isVisitedList.push(bakeryInfo.bakeryName);
      })
    );
    if (isVisitedList == null) {
      isVisitedList = {};
    }
    return userSucceededMissionDto(missionInfo, isVisitedList);
  },

  //미션 달성시 체크
  checkSucceededMission: async (user, bakeryId) => {
    try {
      const mission = await missionUtil.findMissionByDate();
      const isMissionBakery = await missionUtil.isMissionBakery(
        mission,
        bakeryId
      );

      //calculateMissionAchieveCount
      // if mission ==null -> throw err
      const missionBakeryList = await missionUtil.findMissionBakeryByMission(
        mission.id
      );
      let missionAchieveCount = 0;
      await Promise.all(
        missionBakeryList.map(async (bakery) => {
          let isSucceeded = await missionUtil.isVisitedBakery(
            user,
            bakery.BakeryId
          );
          if (isSucceeded == true) missionAchieveCount++;
        })
      );

      // 사용자가 미션달성했는지 산정
      const test = await missionUtil.isSucceededMission(
        user,
        mission.id,
        missionAchieveCount
      );
      console.log("test", test);
      //미션 몇개 달성
      let isSucceeded;
      if (missionAchieveCount >= 3) isSucceeded = true;
      else isSucceeded = false;

      //등급산정 Util(후기개수, 미션빵집)
      const rank = await missionUtil.calculateRank(user);
      console.log(checkSucceededMissionDto(isMissionBakery, isSucceeded, rank));
      return checkSucceededMissionDto(isMissionBakery, isSucceeded, rank);
    } catch (err) {
      console.error();
    }
  },
  //나의 등급
  getUserRank: async (user) => {
    try {
      const userMissionCount = await missionUtil.findUserSucceededMission(user);
      const userReviewCount = await missionUtil.findUserReview(user);
      const calculated = await missionUtil.calculateRank(
        userMissionCount.count,
        userReviewCount.count
      );
      // const calculated = await missionUtil.calculateRank(20, 20);

      if (user.rank !== calculated.rank) {
        await missionUtil.updateUserRank(user, calculated.rank);
      }
    } catch (err) {
      console.log(err);
    }
    // return calculated
  },
};
