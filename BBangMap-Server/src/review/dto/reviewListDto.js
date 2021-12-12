const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, likedReviewList) => {
  return reviewList.map(review => {
    //console.log(likedReviewList);
    return reviewDto(review, likedReviewList);
  });
};

module.exports = reviewListDto;
