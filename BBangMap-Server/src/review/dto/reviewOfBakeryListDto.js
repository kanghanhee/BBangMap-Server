const reviewOfBakeryDto = require('./reviewOfBakeryDto');

const reviewListOfBakeryDto = (reviewOfBakeryList, likedReviewList, likeCountList) => {
  return reviewOfBakeryList.map(reviewOfBakery => {
    return reviewOfBakeryDto(reviewOfBakery, likedReviewList, likeCountList);
  });
};

module.exports = reviewListOfBakeryDto;
