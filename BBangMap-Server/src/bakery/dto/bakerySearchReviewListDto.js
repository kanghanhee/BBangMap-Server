const bakerySearchReviewDto = require('./bakerySearchReviewDto');

const bakerySearchReviewListDto = async (searchBakeryReviewList, latitude, longitude, visitedBakeryList) => {
  return searchBakeryReviewList.map(searchBakeryReview => {
    return bakerySearchReviewDto(searchBakeryReview, latitude, longitude, visitedBakeryList);
  });
};

module.exports = bakerySearchReviewListDto;
