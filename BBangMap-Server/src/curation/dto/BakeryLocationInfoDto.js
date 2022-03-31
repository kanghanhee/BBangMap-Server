const bakeryUtils = require('../../bakery/utils')

const bakeryLocationInfoDto = (bakery, userId) =>{
    return{
        bakeryId : bakery.id,
        bakeryName : bakery.bakeryName,
        bakeryAddress : bakery.address,
        latitude : bakery.latitude,
        longitude : bakery.longitude,
        star : bakeryUtils.getBakeryStar(bakery.Reviews),
        isSaveBakery : bakery.SaverBakery.map(user => user.id).includes(userId)
    }
}

module.exports = bakeryLocationInfoDto;