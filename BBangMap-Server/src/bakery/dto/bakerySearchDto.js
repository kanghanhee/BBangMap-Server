const bakeryUtils = require('../utils');

const bakerySearchDto = async (searchBakery, latitude, longitude, visitedBakeryList) => {
  const updateBakeryImg = await bakeryUtils.addBakeryImg(searchBakery);
  return {
    bakeryId: searchBakery.id,
    bakeryName: searchBakery.bakeryName,
    longitude: searchBakery.longitude,
    latitude: searchBakery.latitude,
    distance:
      latitude == null && longitude == null
        ? null
        : bakeryUtils.getDistance(searchBakery.latitude, searchBakery.longitude, latitude, longitude),
    isVisitedBakery: visitedBakeryList.includes(searchBakery.id),
    address: searchBakery.address,
    star: searchBakery.star,
    mainImg: updateBakeryImg.bakeryImg[0],
    reviewTotalCount: searchBakery.Reviews.length,
  };
};

module.exports = bakerySearchDto;
