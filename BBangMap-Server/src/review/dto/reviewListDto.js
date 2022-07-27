const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList, likeCountList, userId) => {
  return reviewList.map(review => {
    return reviewDto.detailDto(review, likedReviewList, likeCountList, userId);
  });
};

module.exports = reviewListDto;
