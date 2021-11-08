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
    calculateGrade: async (user, mission) => {
        //사용자 전체 미션 달성 개수 가져오기(뱃지 개수)
        const userMissionCount = await this.findUserSucceededMission(user).length;
        //사용자 전체 후기 작성 개수 가져오기
        const userReviewCount = await this.findUserReview(user).length;
        //조건문 걸기
        //user.db접근해서 현재 등급과 다르다면 등급 바꾸기
    },
    //사용자 작성 후기
    findUserReview: async (user) => {
        return userReview = await Review.findAll({
            where: {
                UserId: user.id
            }
        })
    }
}