const reviewUtils = require('../utils');
const userUtils = require('../../user/utils');

const reviewListDto = require('../dto/reviewListDto');
const reviewDetailDto = require('../dto/reviewDetailDto');
const reviewDetailWithAddressDto = require('../dto/reviewDetailWithAddressDto');
const savedReviewOfBakeryListDto = require('../dto/savedReviewOfBakeryListDto');
const savedReviewFolderListDto = require('../dto/savedReviewFolderListDto');
const reviewOfBakeryListDto = require('../dto/reviewOfBakeryListDto');
const myReviewListDto = require('../dto/myReviewListDto');
const reviewListOfUserDto = require('../dto/reviewListOfUserDto');
const reviewDto = require('../dto/reviewDto');
const calculateOffsetAndLimit = require('../../../modules/pagination/paging');

const orderHash = { latest: 'createdAt', best: 'likeReviewCount', undefined: 'createdAt', '': 'createdAt' };

module.exports = {
  getReviewOfBakery: async (order, bakeryId, user) => {
    let reviewOfBakeryList = await reviewUtils.findReviewOfBakery(bakeryId);
    let findUser = await userUtils.findUserIncludeLikedReview(user);
    let visitedBakeryList = findUser.VisitedBakery.map(bakery => bakery.id);
    let savedReviewList = findUser.SavedReview;
    let likedReviewList = findUser.Liked.map(likeReview => likeReview.id);
    // LikeReview
    let likeReview = await reviewUtils.findLikeReview();
    let likeCountList = likeReview.map(likeReview => likeReview.ReviewId);
    let result = reviewOfBakeryListDto(
      findUser,
      reviewOfBakeryList,
      savedReviewList,
      likedReviewList,
      visitedBakeryList,
      likeCountList,
    );
    // 추천수로 정렬
    if (order === 'best') {
      reviewUtils.getSortByLikeCount(result);
    }

    return result;
  },
  getReviewAll: async (order, user, page, pageSize) => {
    if (!page || !pageSize) {
      page = 1;
      pageSize = 500;
    }

    const { offset, limit } = calculateOffsetAndLimit(page, pageSize);
    const reviewList = await reviewUtils.findReviewAll(offset, limit, orderHash[order]);
    const result = reviewListDto(reviewList, user.id);

    return result;
  },
  getSearchReviewList: async (order, searchWord, isOnline, isVegan, user, page, pageSize) => {
    if (!page || !pageSize) (page = 1), (pageSize = 500);

    const { offset, limit } = calculateOffsetAndLimit(page, pageSize);
    const reviewList = await reviewUtils.findReviewSearch(
      searchWord,
      isOnline,
      isVegan,
      offset,
      limit,
      orderHash[order],
    );

    const findUser = await userUtils.findUserIncludeLikedReview(user);
    const likedReviewList = findUser.Liked.map(likeReview => likeReview.id);

    const result = reviewListDto(reviewList, likedReviewList, user.id);

    return result;
  },
  getReviewDetail: async (reviewId, user) => {
    let review = await reviewUtils.findReviewById(reviewId);
    if (review == null) throw new Error('NOT FOUND REVIEW');
    let savedReviewList = await reviewUtils.findUsersSavedReviewList(user);
    let myReviewList = await reviewUtils.findMyReviewList(user);
    let likedReviewList = await reviewUtils.findUsersLikedReviewList(user);
    let likeReviewCount = await reviewUtils.findLikeReviewCount(reviewId);

    return reviewDetailDto(review, savedReviewList, myReviewList, likedReviewList, likeReviewCount.count, user.id);
  },
  getReviewDetailWithAddress: async (reviewId, user) => {
    const review = await reviewUtils.findReviewBakeryById(reviewId);
    if (review == null) throw new Error('NOT FOUND REVIEW');
    const savedReviewList = await reviewUtils.findUsersSavedReviewList(user);
    const likedReviewList = await reviewUtils.findUsersLikedReviewList(user);
    const likeReviewCount = await reviewUtils.findLikeReviewCount(reviewId);

    return reviewDetailWithAddressDto(review, savedReviewList, likedReviewList, likeReviewCount, user.id);
  },
  getSavedReviewFolderList: async user => {
    let findUser = await userUtils.findUserIncludeSavedReview(user);
    let savedReviewList = findUser.SavedReview;
    let savedReviewCountList = savedReviewList.map(savedReview => savedReview.BakeryId);
    let totalCount = await reviewUtils.getSavedReview(user);

    let findUserGroup = await userUtils.findUserIncludeSavedReviewGroup(user);
    let savedReviewFolderGroupList = findUserGroup.SavedReview;

    return savedReviewFolderListDto(savedReviewFolderGroupList, savedReviewCountList, totalCount.count);
  },
  getSavedReviewOfBakeryList: async (bakeryId, user) => {
    let findUser = await userUtils.findUserIncludeSavedReviewOfBakery(bakeryId, user);
    if (findUser !== null) {
      let savedReviewOfBakeryList = findUser.SavedReview;
      let totalCount = await reviewUtils.getSavedReviewOfBakery(user, bakeryId);

      return savedReviewOfBakeryListDto(savedReviewOfBakeryList, totalCount.count);
    }
    return findUser;
  },
  getMyReviewList: async user => {
    let myReviewList = await reviewUtils.findMyReviewList(user);
    let totalCount = await reviewUtils.getMyReview(user);

    let findUser = await userUtils.findUserIncludeLikedReview(user);
    let likedReviewList = findUser.Liked.map(likeReview => likeReview.id);
    // LikeReview
    let likeReview = await reviewUtils.findLikeReview();
    let likeCountList = likeReview.map(likeReview => likeReview.ReviewId);

    return myReviewListDto(myReviewList, likedReviewList, likeCountList, totalCount.count);
  },
  addReview: async (user, bakeryId, isVegan, isOnline, purchaseBreadList, star, content, reviewImgList) => {
    let addReview = await reviewUtils.addReview(
      user,
      bakeryId,
      isVegan,
      isOnline,
      purchaseBreadList,
      star,
      content,
      reviewImgList,
    );
    // check visit bakery
    await reviewUtils.checkVisitBakery(user, bakeryId);
    return addReview;
  },
  addReviewExcludeVeganAndOnline: async (user, bakeryId, purchaseBreadList, star, content, reviewImgList) => {
    if (purchaseBreadList == null) purchaseBreadList = [];
    const newReview = await reviewUtils.addReviewExcludeVeganAndOnline(
      user,
      bakeryId,
      purchaseBreadList,
      star,
      content,
      reviewImgList,
    );
    return reviewDto.summaryDto(newReview);
  },
  updateReview: async (
    reviewId,
    user,
    bakeryId,
    isVegan,
    isOnline,
    purchaseBreadList,
    star,
    content,
    reviewImgList,
  ) => {
    await reviewUtils.updateReview(
      reviewId,
      user,
      bakeryId,
      isVegan,
      isOnline,
      purchaseBreadList,
      star,
      content,
      reviewImgList,
    );
  },
  updateReviewExcludeVeganAndOnline: async (reviewId, user, purchaseBreadList, star, content, reviewImgList) => {
    if (purchaseBreadList == null) purchaseBreadList = [];
    if (reviewImgList == null) reviewImgList = [];

    const preUpdatedReview = await reviewUtils.updateReviewExcludeVeganAndOnline(
      reviewId,
      user,
      purchaseBreadList,
      star,
      content,
      reviewImgList,
    );
    if (preUpdatedReview == null) {
      const error = new Error('NO_EXIST_REVIEW');
      error.statusCode = 400;
      throw error;
    }
    reviewUtils.deleteReviewImages(preUpdatedReview.reviewImgList);
  },

  savedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.savedReview(userId, reviewId);
  },
  likedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.likedReview(userId, reviewId);
  },
  deleteSavedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.deleteSavedReview(userId, reviewId);
  },
  deleteLikedReview: async (reviewId, user) => {
    let userId = user.id;
    await reviewUtils.deleteLikedReview(userId, reviewId);
  },
  deleteMyReview: async (reviewId, user) => {
    let userId = user.id;
    const deletedReview = await reviewUtils.deleteMyReview(userId, reviewId);
    reviewUtils.deleteReviewImages(deletedReview.reviewImgList);
  },
  getUserReview: async userId => {
    const reviewList = await reviewUtils.findUsersReviewList(userId);
    return reviewListOfUserDto(reviewList);
  },
};
