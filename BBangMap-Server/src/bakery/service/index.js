const modelUtil = require('../../../models/modelUtil')
const userUtils = require('../../user/utils')
const bakeryUtils = require('../utils')

const bakeryMapListDto = require('../dto/bakeryMapListDto')
const bakerySearchListDto = require('../dto/bakerySearchListDto')
const bakeryDetailDto = require('../dto/bakeryDetailDto')
const bakeryImgListDto = require('../dto/bakeryImgListDto')
const savedBakeryListDto = require('../dto/savedBakeryListDto')

module.exports = {
    getBakeryMap: async (user, latitude, longitude) => {
        let findUser = await userUtils.findUserIncludeSavedBakery(user);
        let savedBakeryList = findUser.SavedBakery.map(saveBakery => saveBakery.id);

        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude);

        return bakeryMapListDto(bakeryList, savedBakeryList);
    },
    getSearchBakeryList: async (bakeryName) => {
        let searchBakeryList = await bakeryUtils.findBakeryListByBakeryName(bakeryName);
        return bakerySearchListDto(searchBakeryList);
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
    }
}