const modelUtil = require('../../../models/modelUtil')
const userUtils = require('../../user/utils')
const bakeryUtils = require('../utils')

const bakeryMapListDto = require('../dto/bakeryMapListDto')
const bakerySearchListDto = require('../dto/bakerySearchListDto')

module.exports = {
    getBakeryMap: async (user, latitude, longitude) => {
        let bakery = await userUtils.getUserIncludeSavedBakery();
        let savedBakeryList = bakery.SavedBakery.map(saveBakery => saveBakery.id);

        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude);

        return bakeryMapListDto(bakeryList, savedBakeryList);
    },
    getSearchBakeryList: async (bakeryName) => {
        let searchBakeryList = await bakeryUtils.getBakeryListByBakeryName(bakeryName);
        return bakerySearchListDto(searchBakeryList);
    }
}