const {Bakery, User} = require('../../../models')

module.exports={
    getUserIncludeSavedBakery : async()=>{
        return await User.findOne({
            include: {
                model : Bakery,
                as : 'SavedBakery',
                attributes : ['id','bakeryName']
            }
        })
    }
}