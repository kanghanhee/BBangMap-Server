const bakeryUtils = require('../utils');

const bakerySearchReviewDto = (searchBakeryReview, latitude, longitude, visitedBakeryList) => {
  const bakery = searchBakeryReview.Bakery;
  return {
    bakeryId: bakery.id,
    bakeryName: bakery.bakeryName,
    longitude: bakery.longitude,
    latitude: bakery.latitude,
    distance:
      latitude == null && longitude == null
        ? null
        : bakeryUtils.getDistance(bakery.latitude, bakery.longitude, latitude, longitude),
    isVisitedBakery: visitedBakeryList.includes(bakery.id),
    address: bakery.address,
    reviewId: searchBakeryReview.id,
    reviewImgList: searchBakeryReview.reviewImgList,
    reviewStar: searchBakeryReview.star,
    reviewer: searchBakeryReview.User.nickName,
    reviewerImg: searchBakeryReview.User.profileImg,
    reviewCreatedDate: new Date(searchBakeryReview.createdAt + 'z'),
  };
};

module.exports = bakerySearchReviewDto;
