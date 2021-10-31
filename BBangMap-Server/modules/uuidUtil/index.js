const {User} = require('../../models')

const uuidUtil = {
    validUuId: async (uuid) => {
        return await User.findOne({
            where: {
                uuid: uuid
            }
        })
    }
}

module.exports = uuidUtil;