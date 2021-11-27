const bakeryUtils = require('../utils')

const bakerySearchDto = (searchBakery, latitude, longitude) => {
    return {
        bakeryId: searchBakery.id,
        bakeryName: searchBakery.bakeryName,
        longitude : searchBakery.longitude,
        latitude : searchBakery.latitude,
        distance : (latitude == null&& longitude == null) ? null : bakeryUtils.getDistance(
            searchBakery.latitude, searchBakery.longitude, latitude, longitude)
    }
}

module.exports = bakerySearchDto;