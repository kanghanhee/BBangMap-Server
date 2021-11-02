const modelUtil = require('../../../models/modelUtil')
const userUtils = require('../../user/utils')
const bakeryUtils = require('../utils')
const bakeryMapListDto = require('../dto/bakeryMapListDto')
module.exports = {
    getBakeryMap: async (user, latitude, longitude) => {
        let bakery = await userUtils.getUserIncludeSavedBakery();
        let savedBakeryList = bakery.SavedBakery.map(saveBakery => saveBakery.id);

        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude);

        return bakeryMapListDto(bakeryList, savedBakeryList);
    },
    getSearchBakeryList: async (bakeryName) => {
        let bakeryList =  await bakeryUtils.getBakeryListByBakeryName(bakeryName);
        console.log('bakeryList : ',bakeryList)
        return bakeryList.map(bakery => bakery.bakeryName);
    }
}