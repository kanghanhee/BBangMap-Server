const reviewUtils = require("../utils");

const reviewListDto = require("../dto/reviewListDto");
const reviewDetailDto = require("../dto/reviewDetailDto");

module.exports = {
  getReviewAll: async () => {
    let reviewList = await reviewUtils.findReviewAll();

    return reviewListDto(reviewList);
  },
  getSearchReviewList: async (searchWord, isOnline, isVegan) => {
    let reviewList = await reviewUtils.findReviewListBySearchWord(
      searchWord,
      isOnline,
      isVegan
    );

    return reviewListDto(reviewList);
  },
  getReviewDetail: async (reviewId) => {
    let review = await reviewUtils.findReviewById(reviewId);

    return reviewDetailDto(review);
  },
};
