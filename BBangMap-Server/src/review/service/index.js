const reviewUtils = require("../utils");
const userUtils = require("../../user/utils");

const reviewListDto = require("../dto/reviewListDto");
const reviewDetailDto = require("../dto/reviewDetailDto");
const savedReviewOfBakeryListDto = require("../dto/savedReviewOfBakeryListDto");
const savedReviewFolderListDto = require("../dto/savedReviewFolderListDto");
const reviewOfBakeryListDto = require("../dto/reviewOfBakeryListDto");
const myReviewListDto = require("../dto/myReviewListDto");

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
  getSavedReviewFolderList: async (user) => {
    let findUser = await userUtils.findUserIncludeSavedReview(user);
    let savedReviewFolderList = findUser.SavedReview;

    return savedReviewFolderListDto(savedReviewFolderList);
  },
  getSavedReviewOfBakeryList: async (bakeryId, user) => {
    let findUser = await userUtils.findUserIncludeSavedReviewOfBakery(
      bakeryId,
      user
    );
    let savedReviewOfBakeryList = findUser.SavedReview;

    return savedReviewOfBakeryListDto(savedReviewOfBakeryList);
  },
  getMyReviewList: async (user) => {
    let myReviewList = await reviewUtils.findMyReviewList(user);

    return myReviewListDto(myReviewList);
  },
  savedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.savedReview(userId, reviewId);
  },
  deleteSavedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.deleteSavedReview(userId, reviewId);
  },
  deleteMyReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.deleteMyReview(userId, reviewId);
  },
};
