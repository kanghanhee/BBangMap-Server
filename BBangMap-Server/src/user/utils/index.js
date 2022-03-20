/* eslint-disable no-return-await */
const {Bakery, User, Review, sequelize} = require('../../../models');
const {Sequelize} = require("sequelize");

module.exports = {
    findUserIncludeSavedBakery: async user => {
        return await User.findOne({
            where: {id: user.id},
            include: [{
                model: Bakery,
                as: 'SavedBakery',
                attributes: {},
            }, {
                model: Bakery,
                as: 'VisitedBakery',
                attributes: {}
            }]
        });
    },
    findUserIncludeSavedReview: async user => {
        return await User.findOne({
            where: {id: user.id},
            include: {
                model: Review,
                as: 'SavedReview',
                attributes: {},
                include: {
                    model: Bakery,
                    as: 'Bakery',
                    attributes: {},
                },
            },
        });
    },
    findUserIncludeSavedReviewGroup: async user => {
        return await User.findOne({
            where: {id: user.id},
            include: {
                model: Review,
                as: 'SavedReview',
                attributes: {},
                include: {
                    model: Bakery,
                    as: 'Bakery',
                    attributes: {},
                },
            },
            group: ['SavedReview.BakeryId'],
        });
    },
    findUserIncludeSavedReviewOfBakery: async (bakeryId, user) => {
        return await User.findOne({
            where: {id: user.id},
            include: [
                {
                    model: Review,
                    as: 'SavedReview',
                    where: {BakeryId: bakeryId},
                    attributes: {},
                    include: {
                        model: Bakery,
                        as: 'Bakery',
                        attributes: ['bakeryName'],
                    },
                },
            ],
        });
    },
    findUserIncludeLikedReview: async user => {
        return await User.findOne({
            where: {id: user.id},
            include: {
                model: Review,
                as: 'Liked',
                attributes: {},
            },
        });
    },
    findUserIncludeVisitedBakery: async user => {
        try {
            const query = `select *
                           from User
                                    left outer join (VisitBakery inner join Bakery on VisitBakery.BakeryId = Bakery.id)
                                                    on User.id = VisitBakery.UserId
                           where User.id = ${user.id}
            `
            return await sequelize.query(query, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true
            })
        } catch (err) {
            console.error(err)
            throw Error(err);
        }
        // return await User.findOne({
        //   where: { id: user.id },
        //   include: [{
        //     model: Bakery,
        //     as: 'VisitedBakery',
        //     attributes: {}
        //   }]
        // });
    }
};
