const myReviewDto = require("./myReviewDto");

const myReviewListDto = (myReviewList) => {
  return myReviewList.map((myReview) => {
    return myReviewDto(myReview);
  });
};

module.exports = myReviewListDto;
