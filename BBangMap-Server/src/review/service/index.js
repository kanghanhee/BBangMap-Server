const reviewUtils = require("../utils");

const reviewListDto = require("../dto/reviewListDto");

module.exports = {
  getReviewAll: async () => {
    let reviewList = await reviewUtils.findReviewAll();

    console.log(reviewList);
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
};
