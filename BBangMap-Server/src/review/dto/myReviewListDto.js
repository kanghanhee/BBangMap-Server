const myReviewDto = require('./myReviewDto');

const myReviewListDto = (myReviewList, likedReviewList, likeCountList, totalCount) => {
  return {
    reviewList: myReviewList.map(myReview => {
      return myReviewDto(myReview, likedReviewList, likeCountList);
    }),
    totalCount: totalCount,
  };
};

module.exports = myReviewListDto;
