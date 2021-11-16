const reviewUtils = require("../utils");
const userUtils = require("../../user/utils");

const reviewListDto = require("../dto/reviewListDto");
const reviewDetailDto = require("../dto/reviewDetailDto");
const savedReviewListDto = require("../dto/savedReviewListDto");
const reviewOfBakeryListDto = require("../dto/reviewOfBakeryListDto");

module.exports = {
  getReviewOfBakery: async (bakeryId) => {
    let reviewOfBakeryList = await reviewUtils.findReviewOfBakery(bakeryId);

    return reviewOfBakeryListDto(reviewOfBakeryList);
  },
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
  getReviewDetail: async (reviewId, user) => {
    let review = await reviewUtils.findReviewById(reviewId);
    let savedReviewList = await reviewUtils.findUsersSavedReviewList(user);

    return reviewDetailDto(review, savedReviewList);
  },
  getSavedReviewList: async (user) => {
    let findUser = await userUtils.findUserIncludeSavedReview(user);
    let savedReviewList = findUser.SavedReview;

    return savedReviewListDto(savedReviewList);
  },
  savedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.savedReview(userId, reviewId);
  },
};
