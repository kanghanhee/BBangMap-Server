/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
/* eslint-disable no-await-in-loop */
const missionUtil = require('../util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const missionMainDto = require('../dto/missionMainDto');
const missionBakeryDto = require('../dto/missionBakeryDto');
const checkSucceededMissionDto = require('../dto/checkSucceededMissionDto');
const badgeListDto = require('../dto/badgeListDto');
const userSucceededMissionDto = require('../dto/userSucceededMissionDto');
const monthlyMissionDto = require('../dto/monthlyMissionDto');

const dummyBadgeImg = 'https://bbang-map.s3.ap-northeast-2.amazonaws.com/images/mission/badge/badge_bread.png';

// 미션 추가
module.exports = {
  postMission: async (
    missionTitle,
    missionContent,
    missionDate,
    badgeImg,
    badgeName,
    missionActiveStampImg,
    missionInactiveStampImg,
    bakeryList,
  ) => {
    const mission = await missionUtil.createMission(
      missionTitle,
      missionContent,
      new Date(missionDate),
      badgeImg,
      badgeName,
      missionActiveStampImg,
      missionInactiveStampImg,
    );

    await bakeryList.map(bakery => missionUtil.createMissionBakery(mission.id, bakery.bakeryId));
  },
  // 미션 삭제
  // 미션 메인페이지
  getMissionMain: async user => {
    const mission = await missionUtil.findMissionByDate();
    let missionBakeryList = null;
    let missionSuccessWhether = null;
    let bakeryListInfo = [];
    let badgeList = [];
    let missionAchieveCount = 0;
    let monthlyMission = {
      missionId: null,
      missionTitle: null,
      missionContent: null,
      missionActiveStampImg: null,
      missionInactiveStampImg: null,
    };
    if (mission) {
      missionBakeryList = await missionUtil.findMissionBakeryByMission(mission.id);

      missionSuccessWhether = await missionUtil.getMissionAchievedCount(user, mission.id);

      if (missionSuccessWhether) missionAchieveCount = missionSuccessWhether.missionAchieveCount;

      bakeryListInfo = await Promise.all(
        missionBakeryList.map(async bakery => {
          const bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
          const isSucceeded = await missionUtil.isVisitedBakery(user, bakery.BakeryId);
          return missionBakeryDto(bakeryInfo, isSucceeded);
        }),
      );

      monthlyMission = monthlyMissionDto(mission);
    }

    const succeededMissionList = await missionUtil.findUserSucceededMission(user);

    for (let i = 0; i < succeededMissionList.count; i++) {
      const missionInfo = await missionUtil.findMissionById(succeededMissionList.rows[i].MissionId);
      badgeList.push(badgeListDto(missionInfo));
    }

    return missionMainDto(monthlyMission, bakeryListInfo, badgeList, missionAchieveCount);
  },
  // 사용자가 달성한 미션
  getUserSucceededMission: async (user, missionId) => {
    const missionInfo = await missionUtil.findMissionById(missionId);
    if (!missionInfo)
      throw {
        statusCode: statusCode.BAD_REQUEST,
        responseMessage: responseMessage.NO_MISSION,
      };
    let isVisitedList = [];
    const missionSuccessWhether = await missionUtil.getMissionAchievedCount(user, missionId);

    if (!missionSuccessWhether || missionSuccessWhether.missionAchieveCount < 3)
      throw {
        statusCode: statusCode.BAD_REQUEST,
        responseMessage: responseMessage.NOT_SUCCEEDED,
      };

    const missionBakeryList = await missionUtil.findMissionBakeryByMission(missionId);
    await Promise.all(
      missionBakeryList.map(async bakery => {
        const bakeryInfo = await missionUtil.findBakeryById(bakery.BakeryId);
        const isVisited = await missionUtil.isVisitedBakery(user, bakery.BakeryId);
        if (isVisited) {
          isVisitedList.push(bakeryInfo.bakeryName);
        }
      }),
    );
    if (isVisitedList == null) {
      isVisitedList = {};
    }
    return userSucceededMissionDto(missionInfo, isVisitedList);
  },

  // 미션 달성시 체크
  checkSucceededMission: async (user, bakeryId, reviewId) => {
    try {
      let mission = await missionUtil.findMissionByDate();
      let isMissionBakery = false;
      let isSucceeded = false;
      //미션 없을 경우
      if (!mission) {
        mission = {
          badgeName: '폰식빵',
          badgeImg: dummyBadgeImg,
        };
      } else {
        isMissionBakery = await missionUtil.isMissionBakery(mission, bakeryId);
        const missionBakeryList = await missionUtil.findMissionBakeryByMission(mission.id);
        let missionAchieveCount = 0;
        await Promise.all(
          missionBakeryList.map(async bakery => {
            let isVisited = await missionUtil.isVisitedBakery(user, bakery.BakeryId);
            if (isVisited === true) missionAchieveCount += 1;
          }),
        );
        // 후기 작성/삭제시, 배지 달성 체크(missionWhether Table)
        await missionUtil.isSucceededMission(user, mission.id, missionAchieveCount);
        // 이번달 미션 몇개 달성
        let beforeMissionWhether = await missionUtil.getMissionAchievedCount(user, mission.id);
        if (missionAchieveCount == 3 && beforeMissionWhether.missionSuccessWhether == false) {
          isSucceeded = true;
          await missionUtil.checkMissionSucceeded(user, mission.id);
        }
      }
      // 등급산정 Util(후기개수, 미션빵집)
      const userMissionCount = await missionUtil.findUserSucceededMission(user); // 전체 미션개수
      const userReviewCount = await missionUtil.findUserReview(user);
      const beforeRank = user.grade;
      const afterRank = await missionUtil.calculateRank(userMissionCount.count, userReviewCount.count);
      let isChangedRank = false;
      if (user.grade !== afterRank.rank) {
        isChangedRank = true;
        await missionUtil.updateUserRank(user, afterRank.rank);
      }

      result = checkSucceededMissionDto(
        isMissionBakery,
        isSucceeded,
        isChangedRank,
        beforeRank,
        afterRank,
        mission,
        reviewId,
      );

      return result;
    } catch (err) {
      console.log(err);
    }
  },
  // 나의 등급
  getUserRank: async user => {
    const userMissionCount = await missionUtil.findUserSucceededMission(user);
    const userReviewCount = await missionUtil.findUserReview(user);
    const calculated = await missionUtil.calculateRank(userMissionCount.count, userReviewCount.count);
    // const calculated = await missionUtil.calculateRank(20, 20);

    if (user.grade !== calculated.rank) {
      await missionUtil.updateUserRank(user, calculated.rank);
    }
    return calculated;
  },
};
