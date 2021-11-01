const modelUtil = require('../../../models/modelUtil')
const {Bakery, User} = require('../../../models')
const bakeryMapListDto = require('../dto/bakeryMapListDto')
module.exports = {
    getBakeryMap: async (user, latitude, longitude) => {
        let bakery = await User.findOne({
            include:[{
                model : Bakery,
                as : 'SavedBakery',
                attributes : ['id','bakeryName']
            }]
        })
        let savedBakeryList = bakery.SavedBakery.map(saveBakery => saveBakery.id);

        let bakeryList = await modelUtil.scopeOfTheMapRange(latitude, longitude);

        return bakeryMapListDto(bakeryList, savedBakeryList);
    }
}