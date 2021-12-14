const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList, likeCountList) => {
  return reviewList.map(review => {
    //console.log(likedReviewList);
    return reviewDto(review, likedReviewList, likeCountList);
  });
};

module.exports = reviewListDto;
