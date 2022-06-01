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
const adminBakeryDetailDto = require('../dto/adminBakeryDetailDto')

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
            searchBakeryList = await reviewUtils.getBakeryStarOfBakeryList(searchBakeryList);

            return bakerySearchListDto(searchBakeryList, latitude, longitude, visitedBakeryList);
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
            await bakeryUtils.validateDuplicateBakeryInfo(
                registerBakery.bakeryName,
                registerBakery.address,
                registerBakery.latitude,
                registerBakery.longitude
            );

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
                    longitude: registerBakery.longitude,
                    isAllTheTime: registerBakery.isAllTheTime,
                    isIrregularPeriod: registerBakery.isIrregularPeriod,
                    isParkingAvailable: registerBakery.isParkingAvailable,
                    isChildAvailable: registerBakery.isChildAvailable,
                    isReservationAvailable: registerBakery.isReservationAvailable,
                    isPetAvailable: registerBakery.isPetAvailable,
                    blog: registerBakery.blog,
                    instagram: registerBakery.instagram,
                    bakeryImg: []
                }, {transaction});
            });

        } catch (err) {
            throw new Error(err)
        }
    },
    bakeryListByAdmin: async () => {
        const bakeryList = await Bakery.findAll();
        return adminBakeryListDto(bakeryList);
    },
    bakeryDetailByAdmin: async (bakeryId) => {
        const bakery = await Bakery.findByPk(bakeryId);
        if (bakery === null) {
            throw new Error("NOT_EXIST_BAKERY")
        }
        return adminBakeryDetailDto(bakery);
    },
    bakeryModify: async (bakeryId, modifyInfo) => {
        try {
            await bakeryUtils.validateDuplicateBakeryInfo(
                modifyInfo.bakeryName,
                modifyInfo.address,
                modifyInfo.latitude,
                modifyInfo.longitude
            )

            const bakery = await Bakery.findByPk(bakeryId);
            if (bakery === null) throw new Error("NOT_EXIST_BAKERY")
            bakery.set({
                bakeryName: modifyInfo.bakeryName,
                openTime: modifyInfo.openTime,
                offDay: modifyInfo.offDay,
                seasonMenu: modifyInfo.seasonMenu,
                isDrink: modifyInfo.isDrink,
                bestMenu: modifyInfo.bestMenu,
                totalMenu: modifyInfo.totalMenu,
                address: modifyInfo.address,
                latitude: modifyInfo.latitude,
                longitude: modifyInfo.longitude,
                isOnline: modifyInfo.isOnline,
                isVegan: modifyInfo.isVegan,
                isAllTheTime: modifyInfo.isAllTheTime,
                isIrregularPeriod: modifyInfo.isIrregularPeriod,
                isParkingAvailable: modifyInfo.isParkingAvailable,
                isChildAvailable: modifyInfo.isChildAvailable,
                isReservationAvailable: modifyInfo.isReservationAvailable,
                isPetAvailable: modifyInfo.isPetAvailable,
                blog: modifyInfo.blog,
                instagram: modifyInfo.instagram,
            })

            await bakery.save();
        } catch (err) {
            throw new Error(err);
        }
    },
    bakeryDelete: async (bakeryId) => {
        await Bakery.destroy({where: {id: bakeryId}})
    }
}