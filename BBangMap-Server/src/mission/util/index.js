/* eslint-disable func-names */
/* eslint-disable no-return-await */
const { Op } = require('sequelize');
const {
  Mission,
  MissionBakery,
  MissionWhether,
  User,
  VisitBakery,
  Sequelize,
  Bakery,
  Review,
} = require('../../../models');

module.exports = {
  // 미션 추가
  createMission: async (
    missionTitle,
    missionContent,
    missionDate,
    badgeImg,
    badgeName,
    missionActiveStampImg,
    missionInactiveStampImg,
  ) => {
    return await Mission.create({
      missionTitle,
      missionContent,
      missionDate: new Date(missionDate),
      badgeImg,
      badgeName,
      missionActiveStampImg,
      missionInactiveStampImg,
    });
  },
  // 미션 빵집 추가
  createMissionBakery: async (missionId, bakeryId) => {
    await MissionBakery.create({
      MissionId: missionId,
      BakeryId: bakeryId,
    });
  },
  // 이달의 미션 조회
  findMissionByDate: async () => {
    return await Mission.findOne({
      where: {
        [Op.and]: [
          Sequelize.literal(`missionDate > LAST_DAY(NOW() - interval 1 month) AND missionDate <= LAST_DAY(NOW())`),
        ],
      },
    });
  },
  // 미션 id로 미션 조회
  findMissionById: async missionId => {
    return await Mission.findOne({
      where: {
        id: missionId,
      },
    });
  },
  // 해당 미션의 미션 빵집
  findMissionBakeryByMission: async missionId => {
    return await MissionBakery.findAll({
      where: {
        MissionId: missionId,
      },
      attributes: ['BakeryId'],
    });
  },
  // 빵집id로 빵집 조회
  findBakeryById: async bakeryId => {
    return await Bakery.findOne({
      where: {
        id: bakeryId,
      },
    });
  },

  // 빵집 방문 여부
  isVisitedBakery: async (user, bakeryId) => {
    const isVisited = await VisitBakery.findOne({
      where: {
        [Op.and]: [
          {
            BakeryId: bakeryId,
          },
          {
            UserId: user.id,
          },
        ],
      },
    });

    return isVisited != null;
  },
  // 사용자 전체 달성 미션 조회
  findUserSucceededMission: async user => {
    return await MissionWhether.findAndCountAll({
      raw: true,
      where: {
        [Op.and]: [
          {
            missionSuccessWhether: true,
          },
          {
            UserId: user.id,
          },
        ],
      },
    });
  },
  // 후기 작성/삭제 시, 배지 달성 체크
  isSucceededMission: async (user, missionId, missionAchieveCount) => {
    await MissionWhether.findOne({
      where: {
        [Op.and]: [
          {
            MissionId: missionId,
          },
          {
            UserId: user.id,
          },
        ],
      },
    }).then(function (userMission) {
      if (!userMission)
        return MissionWhether.create({
          missionAchieveCount,
          UserId: user.id,
          MissionId: missionId,
          missionSuccessWhether: false,
        });
      return MissionWhether.update(
        {
          missionAchieveCount,
        },
        {
          where: {
            [Op.and]: [
              {
                MissionId: missionId,
              },
              {
                userId: user.id,
              },
            ],
          },
        },
      );
    });
  },
  // whether 미션달성 체크
  checkMissionSucceeded: async (user, missionId) => {
    await MissionWhether.update(
      {
        missionSuccessWhether: true,
      },
      {
        where: {
          [Op.and]: [
            {
              MissionId: missionId,
            },
            {
              userId: user.id,
            },
          ],
        },
      },
    );
  },
  getMissionAchievedCount: async (user, missionId) => {
    return MissionWhether.findOne({
      where: {
        [Op.and]: [
          {
            MissionId: missionId,
          },
          {
            userId: user.id,
          },
        ],
      },
    });
  },
  // 빵집이 미션 빵집인지
  isMissionBakery: async (mission, bakeryId) => {
    const isMission = await MissionBakery.findOne({
      where: {
        [Op.and]: [
          {
            MissionId: mission.id,
          },
          {
            BakeryId: bakeryId,
          },
        ],
      },
    });
    return isMission != null;
  },
  // 등급 산정 + 체크
  calculateRank: async (userMissionCount, userReviewCount) => {
    let rank; // 등급
    if (userMissionCount >= 30 && userReviewCount >= 30) rank = 3;
    else if (userMissionCount >= 20 && userReviewCount >= 20) rank = 2;
    else rank = 1;

    const result = {
      rank,
      reviewCount: userReviewCount,
      missionCount: userMissionCount,
    };
    return result;
  },
  // 등급 변경
  updateUserRank: async (user, newRank) => {
    await User.update(
      {
        grade: newRank,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
  },

  // 사용자 작성 후기
  findUserReview: async user =>
    await Review.findAndCountAll({
      where: {
        UserId: user.id,
      },
    }),
};
