const {
  Mission,
  MissionBakery,
  MissionWhether,
  User,
  InviteBakery,
  Sequelize,
  Bakery,
} = require("../../../models");
const {
  Op
} = require("sequelize");

module.exports = {
  //미션 추가
  createMission: async (
    missionTitle,
    missionContent,
    missionDate,
    badgeImg
  ) => {
    return await Mission.create({
      missionTitle: missionTitle,
      missionContent: missionContent,
      missionDate: new Date(missionDate),
      badgeImg: badgeImg,
    });
  },
  //미션 빵집 추가
  createMissionBakery: async (missionId, bakeryId) => {
    await MissionBakery.create({
      MissionId: missionId,
      BakeryId: bakeryId,
    });
  },
  //이달의 미션 조회
  findMissionByDate: async () => {
    return await Mission.findOne({
      where: {
        [Op.and]: [
          Sequelize.literal(
            `missionDate > LAST_DAY(NOW() - interval 1 month) AND missionDate <= LAST_DAY(NOW())`
          ),
        ],
      },
    });
  },
  //미션 id로 미션 조회
  findMissionById: async (missionId) => {
    return await Mission.findOne({
      where: {
        MissionId: missionId,
      },
    });
  },
  //해당 미션의 미션 빵집
  findMissionBakeryByMission: async (missionId) => {
    return await MissionBakery.findAll({
      where: {
        MissionId: missionId,
      },
    });
  },
  //빵집id로 빵집 조회
  findBakeryById: async (bakeryId) => {
    return await Bakery.findOne({
      where: {
        id: bakeryId,
      },
    });
  },
  //사용자 방문 미션 빵집
  isVisitedMissionBakery: async (user, missionId) => {
    //사용자의 방문 빵집 == 해당 달의 미션 빵집
    const missionBakeryList = await this.findMissionBakeryByMission(missionId);
    return await missionBakeryList.map((bakeryId) => {
      InviteBakery.findAll({
        where: {
          [Op.and]: [{
              UserId: user.id,
            },
            {
              BakeryId: bakeryId,
            },
          ],
        },
      });
    });
  },
  //빵집 방문 여부
  isVisitedBakery: async (user, bakeryId) => {
    const isVisited = await InviteBakery.findOne({
      where: [{
          BakeryId: bakeryId,
        },
        {
          UserId: user.id,
        },
      ],
    });
    if (isVisited != null) return true;
    return false;
  },
  //미션 빵집 사용자 방문 여부
  isVisitedBakeryDetail: async (user, missionId) => {
    const missionBakeryList = await findMissionBakeryByMission(missionId).map(
      (BakeryId) => this.findBakeryById(BakeryId)
    );
    const isVisited = await missionBakeryList.map((BakeryId) =>
      this.isVistedBakery(user, BakeryId)
    );
    const result = {
      missionBakeryId: missionBakeryList.id,
      missionBakeryName: missionBakeryList.bakeryName,
      isVisited: isVisited,
    };
    return result;
  },
  //사용자 전체 달성 미션 조회
  findUserSucceededMission: async (user) => {
    return await MissionWhether.findAll({
      where: {
        [Op.and]: [{
            missionSuccessWhether: true,
          },
          {
            UserId: user.id,
          },
        ],
      },
    });
  },
  //후기 작성 시, 배지 달성 체크
  isSucceededMission: async (user, missionId) => {
    const missionCount = isVisitedBakery(user, missionId).length;
    if ((missionCount = 3)) {
      await MissionWhether.create({
        UserId: user.id,
      }, {
        MissionId: missionId,
      }, {
        missionSuccessWhether: true,
      });
    }
    if (missionCount >= 3) return true;
  },
  //빵집이 미션 빵집인지
  isMissionBakery: async (mission, bakeryId) => {
    const isMission = this.findMissionBakeryByMission(mission.id).filter(
      (Bakery) => Bakery.BakeryId === Number(bakeryId)
    )[0];
    if (!isMission) return false;
    else return true;
  },
  //등급 산정 + 체크
  calculateRank: async (user) => {
    let rank;

    const userMissionCount = await this.findUserSucceededMission(user).length;
    const userReviewCount = await this.findUserReview(user).length;
    const userRank = await this.user.rank

    if (userMissionCount >= 30 && userReviewCount >= 30) rank = 3;
    else if (userMissionCount >= 20 && userReviewCount >= 20) rank = 2;
    else rank = 1;

    if (userRank !== rank) {
      this.updateUserRank(user, rank)
    }
    const result = {
      rank: rank,
      reviewCount: userReviewCount,
      missionCount: userMissionCount
    }
    return result

  },
  //등급 변경
  updateUserRank: async (user, newRank) => {
    const updateUse = await User.update({
      rank: newRank
    }, {
      where: {
        id: user.id
      }
    })
  },
  //사용자 작성 후기
  findUserReview: async (user) => {
    return userReview = await Review.findAll({
      where: {
        UserId: user.id
      }
    })
  },



};