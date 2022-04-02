const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const reviewService = require('../service');
const missionService = require('../../mission/service');
const reviewUtils = require('../utils');
const slackSender = require('../../../other/slackSender');

module.exports = {
  reviewOfBakery: async (req, res) => {
    try {
      let { bakeryId, order } = req.query;
      let user = req.header.user;
      let reviewOfBakeryListDto = await reviewService.getReviewOfBakery(order, bakeryId, user);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewOfBakeryListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewAll: async (req, res) => {
    try {
      let { order } = req.query;
      let user = req.header.user;
      let reivewAllListDto = await reviewService.getReviewAll(order, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reivewAllListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewSearch: async (req, res) => {
    try {
      let { searchWord, isOnline, isVegan, order } = req.query;
      let user = req.header.user;
      let reviewSearchListDto = await reviewService.getSearchReviewList(order, searchWord, isOnline, isVegan, user);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewSearchListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewDetail: async (req, res) => {
    try {
      let { reviewId } = req.query;
      let user = req.header.user;
      let reviewDetailDto = await reviewService.getReviewDetail(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewDetailDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewFolderList: async (req, res) => {
    try {
      let user = req.header.user;
      let savedReviewFolderListDto = await reviewService.getSavedReviewFolderList(user);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, savedReviewFolderListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewOfBakeryList: async (req, res) => {
    try {
      let { bakeryId } = req.params;
      let user = req.header.user;
      let savedReviewListDto = await reviewService.getSavedReviewOfBakeryList(bakeryId, user);
      if (savedReviewListDto === null)
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_SAVED_REIVEW));
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, savedReviewListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  myReview: async (req, res) => {
    try {
      let user = req.header.user;
      let myReviewListDto = await reviewService.getMyReviewList(user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, myReviewListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  addReview: async (req, res) => {
    let { bakeryId, isVegan, isOnline, purchaseBreadList, star, content, reviewImg } = req.body;
    let files = [];
    if (req.files['reviewImgList']) files = req.files['reviewImgList'];

    if (Array.isArray(files)) {
      var reviewImgList = new Array();
      for (var i = 0; i < files.length; i++) {
        reviewImgList.push(files[i].location);
      }
    }
    try {
      let user = req.header.user;
      let review = await reviewService.addReview(
        user,
        bakeryId,
        isVegan,
        isOnline,
        purchaseBreadList,
        star,
        content,
        reviewImgList,
      );
      const missionResult = await missionService.checkSucceededMission(user, bakeryId, review.id);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_REVIEW, missionResult));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  updateReview: async (req, res) => {
    let { reviewId } = req.params;
    let { bakeryId, isVegan, isOnline, purchaseBreadList, star, content, reviewImg } = req.body;
    let files = [];
    if (req.files['reviewImgList']) files = req.files['reviewImgList'];

    if (Array.isArray(files)) {
      var reviewImgList = new Array();

      for (var i = 0; i < files.length; i++) {
        reviewImgList.push(files[i].location);
      }
    }
    try {
      let user = req.header.user;
      let updateReview = await reviewService.updateReview(
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

      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_REVIEW, updateReview));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  saveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.savedReview(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  likeReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.likedReview(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LIKED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unSaveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteSavedReview(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNSAVED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unLikeReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteLikedReview(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNLIKED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  deleteMyReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteMyReview(reviewId, user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
