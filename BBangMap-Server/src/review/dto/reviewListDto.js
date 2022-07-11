const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList, likeCountList, userId) => {
  return reviewList.map(review => {
    return reviewDto.v1Dto(review, likedReviewList, likeCountList, userId);
  });
};

module.exports = reviewListDto;
