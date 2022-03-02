const bakeryUtils = require('../utils')

const bakeryLocationInfoDto = async (bakery, user) =>{
    return{
        bakeryId : bakery.id,
        bakeryAddress : bakery.address,
        latitude : bakery.latitude,
        longitude : bakery.longitude,
        star : await bakeryUtils.getBakeryStar(bakery.Reviews),
        isSaveBakery : bakery.SaverBakery.map(user => user.id).includes(user.id)
    }
}

module.exports = bakeryLocationInfoDto;