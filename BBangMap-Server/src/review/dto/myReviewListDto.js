const myReviewDto = require('./myReviewDto');

const myReviewListDto = (myReviewList, likedReviewList, likeCountList) => {
  return myReviewList.map(myReview => {
    return myReviewDto(myReview, likedReviewList, likeCountList);
  });
};

module.exports = myReviewListDto;
