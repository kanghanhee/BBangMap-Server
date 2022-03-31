const bakeryUtils = require('../utils')

const bakerySearchDto = (searchBakery, latitude, longitude, visitedBakeryList, star) => {
    return {
        bakeryId: searchBakery.id,
        bakeryName: searchBakery.bakeryName,
        longitude : searchBakery.longitude,
        latitude : searchBakery.latitude,
        distance : (latitude == null&& longitude == null) ? null : bakeryUtils.getDistance(
            searchBakery.latitude, searchBakery.longitude, latitude, longitude),
        isVisitedBakery : visitedBakeryList.includes(searchBakery.id),
        address : searchBakery.address,
        star : star
    }
}

module.exports = bakerySearchDto;