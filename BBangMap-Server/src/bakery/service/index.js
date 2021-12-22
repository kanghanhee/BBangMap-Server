const modelUtil = require('../../../models/modelUtil')
const userUtils = require('../../user/utils')
const bakeryUtils = require('../utils')
const {Bakery} = require('../../../models')

const bakeryMapListDto = require('../dto/bakeryMapListDto')
const bakerySearchListDto = require('../dto/bakerySearchListDto')
const bakeryDetailDto = require('../dto/bakeryDetailDto')
const bakeryImgListDto = require('../dto/bakeryImgListDto')
const savedBakeryListDto = require('../dto/savedBakeryListDto')

module.exports = {
    getBakeryMap: async (user, latitude, longitude, radius) => {
        let findUser = await userUtils.findUserIncludeSavedBakery(user);
        let savedBakeryList = findUser.SavedBakery.map(saveBakery => saveBakery.id);

        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude, radius);

        return bakeryMapListDto(bakeryList, savedBakeryList);
    },
    getSearchBakeryList: async (bakeryName, latitude, longitude, user) => {
        let searchBakeryByBreadList = await bakeryUtils.findBakeryListByBakeryBestMenu(bakeryName);

        if(searchBakeryByBreadList.length > 0) return bakerySearchListDto(searchBakeryByBreadList, latitude, longitude);

        let searchBakeryList = await bakeryUtils.findBakeryListByBakeryName(bakeryName);

        let findUser = await userUtils.findUserIncludeVisitedBakery(user);
        let visitedBakeryList = findUser.VisitedBakery.map(visitedBakery => visitedBakery.id);

        return bakerySearchListDto(searchBakeryList, latitude, longitude, visitedBakeryList);
    },
    getBakeryDetail: async (bakeryId, user) => {
        let bakery = await bakeryUtils.findBakeryById(bakeryId);
        let savedBakeryList = await bakeryUtils.findUsersSavedBakeryList(user);
        let visitedBakeryList = await bakeryUtils.findUsersVisitedBakeryList(user);
        return bakeryDetailDto(bakery, savedBakeryList, visitedBakeryList);
    },
    getBakeryImgList: async (bakeryId) => {
        let bakery = await bakeryUtils.findBakeryById(bakeryId);
        return bakeryImgListDto(bakery);
    },
    getSavedBakeryList: async (user) => {
        let findUser = await userUtils.findUserIncludeSavedBakery(user);
        let savedBakeryList = findUser.SavedBakery;
        return savedBakeryListDto(savedBakeryList);
    },
    savedBakery: async (bakeryId, user) => {
        let userId = user.id;
        await bakeryUtils.savedBakery(userId, bakeryId);
    },
    deleteSaveBakery: async (bakeryId, user) => {
        let userId = user.id;
        await bakeryUtils.deleteSaveBakery(userId, bakeryId);
    },
    createBakery: async (registerBakery) => {
        await Bakery.create({
            bakeryName : registerBakery.bakeryName,
            openTime : registerBakery.openTime,
            offDay : registerBakery.offDay,
            seasonMenu : registerBakery.seasonMenu,
            isOnline : registerBakery.isOnline,
            isVegan : registerBakery.isVegan,
            isDrink : registerBakery.isDrink,
            bestMenu : registerBakery.bestMenu,
            totalMenu : registerBakery.totalMenu,
            address : registerBakery.address,
            latitude : registerBakery.latitude,
            longitude : registerBakery.longitude,
            bakeryImg : registerBakery.bakeryImg
        });
    }
}