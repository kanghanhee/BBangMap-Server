const reviewUtils = require("../utils");

const reviewListDto = require("../dto/reviewListDto");

module.exports = {
  getReviewAll: async () => {
    let reviewList = await reviewUtils.findReviewAll();

    return reviewListDto(reviewList);
  },
};
