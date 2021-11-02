const {Bakery, User} = require('../../../models')

module.exports={
    findUserIncludeSavedBakery : async()=>{
        return await User.findOne({
            include: {
                model : Bakery,
                as : 'SavedBakery',
                attributes : ['id','bakeryName']
            }
        })
    }
}