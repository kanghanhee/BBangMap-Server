const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const reviewService = require('../service');
const missionService = require('../../mission/service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  reviewOfBakery: async (req, res) => {
    try {
      let { bakeryId, order } = req.query;
      let user = req.header.user;
      let reviewOfBakeryListDto = await reviewService.getReviewOfBakery(order, bakeryId, user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewOfBakeryListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewAll: async (req, res) => {
    try {
      let { order, page, pageSize } = req.query;
      let user = req.header.user;

      let reivewAllListDto = await reviewService.getReviewAll(order, user, page, pageSize);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reivewAllListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewSearch: async (req, res) => {
    try {
      let { searchWord, isOnline, isVegan, order, page, pageSize } = req.query;
      let user = req.header.user;
      let reviewSearchListDto = await reviewService.getSearchReviewList(
        order,
        searchWord,
        isOnline,
        isVegan,
        user,
        page,
        pageSize,
      );
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewSearchListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewDetail: async (req, res) => {
    try {
      let { reviewId } = req.query;
      let user = req.header.user;
      let reviewDetailDto = await reviewService.getReviewDetail(reviewId, user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, reviewDetailDto));
    } catch (err) {
      if (err.message == 'NOT FOUND REVIEW') {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      }
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewFolderList: async (req, res) => {
    try {
      let user = req.header.user;
      let savedReviewFolderListDto = await reviewService.getSavedReviewFolderList(user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, savedReviewFolderListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewOfBakeryList: async (req, res) => {
    try {
      let { bakeryId } = req.params;
      let user = req.header.user;
      let savedReviewListDto = await reviewService.getSavedReviewOfBakeryList(bakeryId, user);
      if (savedReviewListDto === null)
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_SAVED_REIVEW));
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, savedReviewListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  myReview: async (req, res) => {
    try {
      let user = req.header.user;
      let myReviewListDto = await reviewService.getMyReviewList(user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, myReviewListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  addReview: async (req, res) => {
    let user = req.header.user;

    const appVersion = req.header.appVersion;

    if (appVersion === -1) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_APP_VERSION));
    }

    let files = [];
    if (req.files['reviewImgList']) files = req.files['reviewImgList'];

    if (Array.isArray(files)) {
      var reviewImgList = new Array();
      for (var i = 0; i < files.length; i++) {
        reviewImgList.push(files[i].location);
      }
    }
    try {
      let result = '';
      if (appVersion != null && appVersion >= 1.3) {
        let { bakeryId, purchaseBreadList, star, content } = req.body;

        if (bakeryId == null || star == null || content == null)
          return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

        result = await reviewService.addReviewExcludeVeganAndOnline(
          user,
          bakeryId,
          purchaseBreadList,
          star,
          content,
          reviewImgList,
        );
      } else {
        let { bakeryId, isVegan, isOnline, purchaseBreadList, star, content, reviewImg } = req.body;
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
        result = await missionService.checkSucceededMission(user, bakeryId, review.id);
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CREATE_REVIEW, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  updateReview: async (req, res) => {
    let user = req.header.user;
    let { reviewId } = req.params;
    const appVersion = req.header.appVersion;

    let files = [];
    if (req.files['reviewImgList']) files = req.files['reviewImgList'];

    if (Array.isArray(files)) {
      var reviewImgList = new Array();
      for (var i = 0; i < files.length; i++) {
        reviewImgList.push(files[i].location);
      }
    }

    try {
      if (appVersion != null && appVersion >= 1.3) {
        let { purchaseBreadList, star, content } = req.body;

        if (star == null || content == null)
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

        await reviewService.updateReviewExcludeVeganAndOnline(
          reviewId,
          user,
          purchaseBreadList,
          star,
          content,
          reviewImgList,
        );
      } else {
        let { bakeryId, isVegan, isOnline, purchaseBreadList, star, content } = req.body;

        await reviewService.updateReview(
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
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  saveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.savedReview(reviewId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  likeReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.likedReview(reviewId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_LIKED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unSaveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteSavedReview(reviewId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNSAVED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unLikeReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteLikedReview(reviewId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UNLIKED_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  deleteMyReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteMyReview(reviewId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_REVIEW));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  getUserReview: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await reviewService.getUserReview(userId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_REVIEW, result));
    } catch (err) {
      slackSender.sendError(err.statusCode, req.method.toUpperCase(), req.originalUrl, err);
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
};
