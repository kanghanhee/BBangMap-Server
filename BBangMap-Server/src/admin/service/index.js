const {
    sequelize,
} = require('../../../models')
const countOfYearAndMonthDto = require('../dto')

module.exports = {
    researchCount: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM SearchLocation
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    likeCountOfReview: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM LikeReview
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    saveCountOfReview: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM SaveReview
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    likeCountOfCuration: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM LikeCuration
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    saveCountOfBakery: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM SaveBakery
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    visitCountOfBakery: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM VisitBakery
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },

    joinCountOfUser: async () => {
        const query = `SELECT
                           YEAR (createdAt) AS Year,
                           Month (createdAt) AS Month,
                           COUNT (*) AS Count
                       FROM User
                       GROUP BY Year, Month
                       ORDER BY Year DESC, Month DESC;
        `
        const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        return countOfYearAndMonthDto(result);
    },
}