const {
  Mission,
  MissionBakery,
  MissionWhether,
  User,
  InviteBakery,
  Sequelize,
  Bakery,
  Review
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
        id: missionId,
      },
    });
  },
  //해당 미션의 미션 빵집
  findMissionBakeryByMission: async (missionId) => {
    return await MissionBakery.findAll({
      where: {
        MissionId: missionId,
      },
      attributes: ['BakeryId']
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
  // //사용자 방문 미션 빵집
  // isVisitedMissionBakery: async (user, missionId) => {
  //   //사용자의 방문 빵집 == 해당 달의 미션 빵집
  //   let result = await missionBakeryList.map((bakery) => {
  //     InviteBakery.findAll({
  //       where: {
  //         [Op.and]: [{
  //             UserId: user.id,
  //           },
  //           {
  //             BakeryId: bakery.BakeryId,
  //           }
  //         ],
  //       },
  //     });
  //   });
  //   return result
  // },
  // //빵집 방문 여부
  isVisitedBakery: async (user, bakeryId) => {
    const isVisited = await InviteBakery.findOne({
      where: {
        [Op.and]: [{
            BakeryId: bakeryId,
          },
          {
            UserId: user.id,
          },
        ],
      }
    });
    if (!isVisited) return false; //isNull
    else return true;
  },
  //사용자 전체 달성 미션 조회
  findUserSucceededMission: async (user) => {
    return await MissionWhether.findAndCountAll({
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
  //후기 작성/삭제 시, 배지 달성 체크
  isSucceededMission: async (user, missionId, missionAchieveCount) => {
    const achieveMission = await MissionWhether.findOne({
        where: {
          [Op.and]: [{
            MissionId: missionId
          }, {
            UserId: user.id
          }],
        }
      })
      .then(function (userMission) {

        if (!userMission) return MissionWhether.create({
          missionAchieveCount: missionAchieveCount,
          UserId: user.id,
          MissionId: missionId,
          missionSuccessWhether: false
        });
        return MissionWhether.update({
          missionAchieveCount: missionAchieveCount
        }, {
          where: {
            [Op.and]: [{
              MissionId: missionId
            }, {
              userId: user.id
            }],
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
  },
  getMissionAcheiveCount: async (user, missionId) => {
    return MissionWhether.findOne({
      where: {
        [Op.and]: [{
          MissionId: missionId
        }, {
          userId: user.id
        }],
      }
    })
  },
  //빵집이 미션 빵집인지
  isMissionBakery: async (mission, bakeryId) => {
    const isMission = await MissionBakery.findOne({
      where: {
        [Op.and]: [{
          MissionId: mission.id
        }, {
          BakeryId: bakeryId
        }],
      }
    })
    if (!isMission) return false;
    else return true;
  },
  //등급 산정 + 체크
  calculateGrade: async (userMissionCount, userReviewCount) => {
    let grade; //등급
    if (userMissionCount >= 30 && userReviewCount >= 30) grade = 3;
    else if (userMissionCount >= 20 && userReviewCount >= 20) grade = 2;
    else grade = 1;

    const result = {
      grade: grade,
      reviewCount: userReviewCount,
      missionCount: userMissionCount
    }
    return result
  },
  //등급 변경
  updateUserGrade: async (user, newGrade) => {
      await User.update({
        grade: newGrade
      }, {
        where: {
          id: user.id,
        }
      });
  },


  //사용자 작성 후기
  findUserReview: async (user) => {
    return userReview = await Review.findAndCountAll({
      where: {
        UserId: user.id
      }
    })
  },



};