const {Bakery, SaveBakery, VisitBakery, Review} = require('../../../models')
const {Op} = require('sequelize')

module.exports = {
    findBakeryListByBakeryName: async (bakeryName) => {
        return Bakery.findAll({
            where: {
                [Op.or]: [
                    {bakeryName: {[Op.like]: `${bakeryName}%`}},
                    {bakeryName: {[Op.like]: `%${bakeryName}%`}}
                ]
            }
            //방문 빵집이 많은 순으로 정렬
        })
    },
    findBakeryById: async (bakeryId) => {
        return Bakery.findOne({
            where: {
                id: bakeryId
            },
            include: [{
                model: Review,
                attributes: {}
            }]
        });
    },
    findUsersSavedBakeryList: async (user) => {
        return SaveBakery.findAll({
            where: {UserId: user.id}
        });
    },
    findUsersVisitedBakeryList: async (user) => {
        return VisitBakery.findAll({
            where: {UserId: user.id}
        });
    },
    isSavedBakery: async (bakery, savedBakeryList) => {
        const isContainBakery = (savedBakeryList) => savedBakeryList.BakeryId === bakery.id;
        return savedBakeryList.some(isContainBakery);
    },
    isVisitedBakery: async (bakery, invitedBakeryList) => {
        const isContainBakery = (invitedBakeryList) => invitedBakeryList.BakeryId === bakery.id;
        return invitedBakeryList.some(isContainBakery);
    },
    savedBakery: async (userId, bakeryId) => {
        await SaveBakery.create({UserId: userId, BakeryId: bakeryId})
    },
    deleteSaveBakery: async (userId, bakeryId) => {
        await SaveBakery.destroy({
            where:{
                UserId : userId,
                BakeryId : bakeryId
            }
        })
    }
}