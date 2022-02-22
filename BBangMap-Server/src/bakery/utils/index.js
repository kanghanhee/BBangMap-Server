const {Bakery, SaveBakery, VisitBakery, Review, User} = require('../../../models')
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
    findBakeryListByBakeryBestMenu: async (bread) => {
        return Bakery.findAll({
            where: {
                bestMenu: {[Op.like]: `%${bread}%`}
            },
            // raw: true,
            // nest: true,
            attributes: {}
        })
    },
    findBakeryById: async (bakeryId) => {
        return Bakery.findOne({
            where: {
                id: bakeryId
            },
            include: [{
                model: Review,
                attributes: {},
                include: [{
                    model: User
                },{
                    model: User,
                    as: 'Liker'
                }]
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
            where: {
                UserId: userId,
                BakeryId: bakeryId
            }
        })
    },
    getDistance: (lat1, lng1, lat2, lng2) => {
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
        }

        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lng2 - lng1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d.toFixed(2);
    },
    filterBakeryByBread: async (searchBakeryByBreadList, bread) => {
        return searchBakeryByBreadList.filter(bakery => {
            return bakery.bestMenu.includes(bread);
        })
    },
    addBakeryImg: async (bakery) => {
        var originalBakeryImgList = bakery.bakeryImg.length > 0 ? bakery.bakeryImg : ["https://bbang-map.s3.ap-northeast-2.amazonaws.com/images/bakery/empty-bakery-image.jpg"];

        let reviewImgList = [];
        if (bakery.Reviews.length > 0) {
            originalBakeryImgList = [];
            reviewImgList = bakery.Reviews
                .map(review => review.reviewImgList)
                .reduce((reviewImgArr, next) =>
                    reviewImgArr.concat(next));
        }
        bakery.bakeryImg = originalBakeryImgList.concat(reviewImgList);
        return bakery;
    }
}