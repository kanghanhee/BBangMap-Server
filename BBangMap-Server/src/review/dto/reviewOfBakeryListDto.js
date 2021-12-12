const reviewOfBakeryDto = require('./reviewOfBakeryDto');

const reviewListOfBakeryDto = (reviewOfBakeryList, likedReviewList) => {
  return reviewOfBakeryList.map(reviewOfBakery => {
    return reviewOfBakeryDto(reviewOfBakery, likedReviewList);
  });
};

module.exports = reviewListOfBakeryDto;
