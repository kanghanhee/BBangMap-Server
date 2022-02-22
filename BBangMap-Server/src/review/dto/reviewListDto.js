const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList, likeCountList, userId) => {
  return reviewList.map(review => {
    return reviewDto(review, likedReviewList, likeCountList, userId);
  });
};

module.exports = reviewListDto;
