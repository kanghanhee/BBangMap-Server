const {
    sequelize,
    User,
    LikeCuration,
    SaveBakery,
    VisitBakery,
    SearchLocation,
    LikeReview,
    SaveReview
} = require('../../../models')
const researchCountDto = require('../dto')

module.exports = {
    researchCount: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM SearchLocation
                       GROUP BY Year, Month
                       ORDER BY Year, Month;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        console.log(result);
    return researchCountDto(result);
    }
}