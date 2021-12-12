const myReviewDto = require('./myReviewDto');

const myReviewListDto = (myReviewList, likedReviewList) => {
  return myReviewList.map(myReview => {
    return myReviewDto(myReview, likedReviewList);
  });
};

module.exports = myReviewListDto;
