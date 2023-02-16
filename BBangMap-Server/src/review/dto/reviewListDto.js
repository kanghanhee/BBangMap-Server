const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList, userId) => {
  return reviewList.map(review => {
    return reviewDto.detailDto(review, likedReviewList, userId);
  });
};

module.exports = reviewListDto;
