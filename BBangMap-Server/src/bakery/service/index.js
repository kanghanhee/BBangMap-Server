const modelUtil = require('../../../models/modelUtil')
const userUtils = require('../../user/utils')
const bakeryUtils = require('../utils')
const reviewUtils = require('../../review/utils')
const {Bakery} = require('../../../models')
const db = require('../../../models')

const bakeryMapListDto = require('../dto/bakeryMapListDto')
const bakerySearchListDto = require('../dto/bakerySearchListDto')
const bakeryDetailDto = require('../dto/bakeryDetailDto')
const bakeryImgListDto = require('../dto/bakeryImgListDto')
const savedBakeryListDto = require('../dto/savedBakeryListDto')
const adminBakeryListDto = require('../dto/adminBakeryListDto')

module.exports = {
    getBakeryMap: async (user, latitude, longitude, radius) => {
        let savedBakeryList = await bakeryUtils.findUsersSavedBakeryList(user);
        let visitedBakeryList = await bakeryUtils.findUsersVisitedBakeryList(user);
        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude, radius);

        await reviewUtils.findReviewByBakeryList(bakeryList);

        return await bakeryMapListDto(bakeryList, savedBakeryList, visitedBakeryList);
    },
    getSearchBakeryList: async (bakeryName, latitude, longitude, user) => {
        if (bakeryName.length > 0) {
            let searchBakeryByBreadList = await bakeryUtils.findBakeryListByBakeryBestMenu(bakeryName);
            let filterBakeryByBread = await bakeryUtils.filterBakeryByBread(searchBakeryByBreadList, bakeryName);
            let findUser = await userUtils.findUserIncludeVisitedBakery(user);
            let visitedBakeryList = findUser.map(visitedBakery => visitedBakery.id);

            if (filterBakeryByBread.length > 0) return bakerySearchListDto(searchBakeryByBreadList, latitude, longitude, visitedBakeryList);

            let searchBakeryList = await bakeryUtils.findBakeryListByBakeryName(bakeryName);
            let bakeryReview = searchBakeryList.flatMap(bakeryList => bakeryList.Reviews);
            bakeryReview.forEach(review => console.log(review))
            let star = reviewUtils.getBakeryStar(bakeryReview);

            return bakerySearchListDto(searchBakeryList, latitude, longitude, visitedBakeryList, star);
        } else {
            return null;
        }
    },
    getBakeryDetail: async (bakeryId, user) => {
        let bakery = await bakeryUtils.findBakeryById(bakeryId);
        let imgUpdateBakery = await bakeryUtils.addBakeryImg(bakery);
        let savedBakeryList = await bakeryUtils.findUsersSavedBakeryList(user);
        let visitedBakeryList = await bakeryUtils.findUsersVisitedBakeryList(user);
        return bakeryDetailDto(imgUpdateBakery, savedBakeryList, visitedBakeryList, user.id);
    },
    getBakeryImgList: async (bakeryId) => {
        let bakery = await bakeryUtils.findBakeryById(bakeryId);
        let imgUpdateBakery = await bakeryUtils.addBakeryImg(bakery);
        return bakeryImgListDto(imgUpdateBakery);
    },
    getSavedBakeryList: async (user) => {
        let savedBakeryList = await bakeryUtils.findUsersSavedBakeryList(user);
        let bakeryList = await Promise.all(savedBakeryList.map(async savedBakery => {
            return await bakeryUtils.findOnlyBakery(savedBakery.BakeryId)
        }))
        return savedBakeryListDto(bakeryList);
    },
    savedBakery: async (bakeryId, user) => {
        let userId = user.id;
        await bakeryUtils.savedBakery(userId, bakeryId);
    },
    deleteSaveBakery: async (bakeryId, user) => {
        let userId = user.id;
        await bakeryUtils.deleteSaveBakery(userId, bakeryId);
    },
    doBakeryVisited: async (bakeryId, user) => {
        const findBakery = await bakeryUtils.findBakeryById(bakeryId);
        const findVisitedBakery = await bakeryUtils.findUsersVisitedBakeryList(user);
        const isVisited = await bakeryUtils.isVisitedBakery(findBakery, findVisitedBakery);
        if (!isVisited) {
            await bakeryUtils.visitedBakery(user.id, bakeryId);
        } else {
            throw new Error("ALREADY_BAKERY_VISITED");
        }
    },
    cancelBakeryVisited: async (bakeryId, user) => {
        const findBakery = await bakeryUtils.findBakeryById(bakeryId);
        const findVisitedBakery = await bakeryUtils.findUsersVisitedBakeryList(user);
        const isVisited = await bakeryUtils.isVisitedBakery(findBakery, findVisitedBakery);

        if (isVisited) {
            await bakeryUtils.deleteVisitBakery(user.id, bakeryId);
        } else {
            throw new Error("ALREADY_CANCEL_BAKERY_VISITED");
        }
    },
    createBakery: async (registerBakery) => {
        try {
            await db.sequelize.transaction(async (transaction) => {
                await Bakery.create({
                    id: registerBakery.id,
                    bakeryName: registerBakery.bakeryName,
                    openTime: registerBakery.openTime,
                    offDay: registerBakery.offDay,
                    seasonMenu: registerBakery.seasonMenu,
                    isOnline: registerBakery.isOnline,
                    isVegan: registerBakery.isVegan,
                    isDrink: registerBakery.isDrink,
                    bestMenu: registerBakery.bestMenu,
                    totalMenu: registerBakery.totalMenu,
                    address: registerBakery.address,
                    latitude: registerBakery.latitude,
                    longitude: registerBakery.longitude
                }, {transaction});
            });

        } catch (err) {
            throw new Error(err)
        }
    },
    bakeryListByAdmin: async () => {
        const bakeryList = await Bakery.findAll();
        return adminBakeryListDto(bakeryList);
    }
}