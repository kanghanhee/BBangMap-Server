const {Bakery, User} = require('../../../models')

module.exports={
    findUserIncludeSavedBakery : async(user)=>{
        return await User.findOne({
            where : {id : user.id},
            include: {
                model : Bakery,
                as : 'SavedBakery',
                attributes : {}
            }
        })
    }
}