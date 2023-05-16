const bakeryUtils = require('../../bakery/utils')

const bakeryLocationInfoDto = (bakery, userId) =>{
    return{
        bakeryId : bakery.id,
        bakeryName : bakery.bakeryName,
        bakeryAddress : bakery.address,
        latitude : bakery.latitude,
        longitude : bakery.longitude,
        star : 5,
        isSaveBakery : bakery.SaverBakery.map(user => user.id).includes(userId)
    }
}

module.exports = bakeryLocationInfoDto;