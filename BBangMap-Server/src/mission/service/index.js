const missionUtil = require("../util");
const monthlyMissionDto = require("../dto/monthlyMissionDto");
const missionMainDto = require("../dto/missionMainDto");
const badgeListDto = require("../dto/badgeListDto");
const { findUserSucceededMission } = require("../util");
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
  //미션 메인페이지
  getMissionMain: async (user) => {
    try {
      const monthlyMission = await this.getMonthlyMission();
      const visitedBakeryList = await missionUtil.isVisitedMissionBakery(
        user,
        mission.id
      );
      console.log(visitedBakeryList);

      const badgeList = this.getUserSucceededMission(user);

      return missionMainDto(monthlyMission, visitedBakeryList, badgeList);
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
  getUserSucceededMission: async (user) => {
    try {
      const succeededMission = await findUserSucceededMission(user);
      const badgeList = await succeededMission.map((MissionId) =>
        badgeListDto(missionUtil.findMissionById(MissionId))
      );
      return badgeList;
    } catch (error) {
      console.error();
    }
  },
  //미션 삭제
  //미션 달성시 체크
  checkSucceededMission: async (user, missionId) => {
    try {
      const isSucceeded = await missionUtil.isSucceededMission(user, missionId);
    } catch (err) {
      console.error();
    }
  },
};
