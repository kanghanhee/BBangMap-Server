const {User} = require('../../src/user/model')

const authUtil = {
    validUserId: async (id) => {
        return User.findOne({
            where : {
                id : id
            }
        })
    }
}