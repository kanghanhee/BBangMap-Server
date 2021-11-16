const savedReviewDto = require("./savedReviewDto");

const savedReviewListDto = (savedReviewList) => {
  return savedReviewList.map((savedReview) => savedReviewDto(savedReview));
};

module.exports = savedReviewListDto;
