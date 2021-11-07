const {
    Mission,
    MissionBakery,
    MissionWhether,
    User,
    InviteBakery,
    Sequelize
} = require('../../../models')
const {
    Op
} = require('sequelize')

module.exports = {
    //미션 추가
    createMission: async (missionTitle, missionContent, missionDate, badgeImg) => {
        return await Mission.create({
            missionTitle: missionTitle,
            missionContent: missionContent,
            missionDate: new Date(missionDate),
            badgeImg: badgeImg
        })
    },
    //미션 빵집 추가
    createMissionBakery: async (missionId, bakeryId) => {
        await MissionBakery.create({
            MissionId: missionId,
            BakeryId: bakeryId
        })
    },
    //이달의 미션 조회
    findMissionByDate: async () => {
        return await Mission.findOne({
            where: {
                [Op.and]: [
                    Sequelize.literal(`missionDate > LAST_DAY(NOW() - interval 1 month) AND missionDate <= LAST_DAY(NOW())`)
                ]
            }
        })
    },
    //미션 id로 미션 조회
    findMissionById: async (missionId) => {
        return await Mission.findOne({
            where: {
                MissionId: missionId
            }
        })
    },
    //해당 미션의 미션 빵집
    findMissionBakeryByMission: async (missionId) => {
        return await MissionBakery.findAll({
            where: {
                MissionId: missionId
            }
        })
    },
    //사용자 방문 미션 빵집
    isVisitedBakery: async (user, missionId) => {
        //사용자의 방문 빵집 == 해당 달의 미션 빵집 
        const missionBakeryList = await this.findMissionBakeryByMission(missionId)

        return await missionBakeryList.map(bakeryId => {
            InviteBakery.findAll({
                where: {
                    [Op.and]: [{
                            UserId: user.id
                        },
                        {
                            BakeryId: bakeryId
                        }
                    ]
                }
            })
        })

    },
    //사용자 전체 달성 미션 조회
    findUserSucceededMission: async (user) => {
        return await MissionWhether.findAll({
            where: {
                [Op.and]: [{
                        missionSuccessWhether: true
                    },
                    {
                        UserId: user.id
                    },
                ]
            }
        })
    },
    //후기 작성 시, 배지 달성 체크
    // BadgeList


}