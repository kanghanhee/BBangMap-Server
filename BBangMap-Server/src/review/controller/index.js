const util = require("../../../modules/util");
const statusCode = require("../../../modules/statusCode");
const responseMessage = require("../../../modules/responseMessage");
const reviewService = require("../service");

module.exports = {
  reviewOfBakery: async (req, res) => {
    try {
      let { bakeryId } = req.query;
      let reviewOfBakeryListDto = await reviewService.getReviewOfBakery(
        bakeryId
      );
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            reviewOfBakeryListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewAll: async (req, res) => {
    try {
      let reivewAllListDto = await reviewService.getReviewAll();
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            reivewAllListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewSearch: async (req, res) => {
    try {
      let { searchWord, isOnline, isVegan } = req.query;
      let reviewSearchListDto = await reviewService.getSearchReviewList(
        searchWord,
        isOnline,
        isVegan
      );
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            reviewSearchListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  reviewDetail: async (req, res) => {
    try {
      let { reviewId } = req.query;
      let user = req.header.user;
      let reviewDetailDto = await reviewService.getReviewDetail(reviewId, user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            reviewDetailDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewFolderList: async (req, res) => {
    try {
      let user = req.header.user;
      let savedReviewFolderListDto =
        await reviewService.getSavedReviewFolderList(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            savedReviewFolderListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  savedReviewOfBakeryList: async (req, res) => {
    try {
      let { bakeryId } = req.params;
      let user = req.header.user;
      let savedReviewListDto = await reviewService.getSavedReviewOfBakeryList(
        bakeryId,
        user
      );
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            savedReviewListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  myReview: async (req, res) => {
    try {
      let user = req.header.user;
      let myReviewListDto = await reviewService.getMyReviewList(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_REVIEW,
            myReviewListDto
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  addReview: async (req, res) => {
    let {
      bakeryId,
      isVegan,
      isOnline,
      purchaseBreadList,
      star,
      content,
      reviewImg,
    } = req.body;
    let files = req.files["reviewImgList"];

    if (Array.isArray(files)) {
      var reviewImgList = new Array();
      console.log(files.length);

      for (var i = 0; i < files.length; i++) {
        reviewImgList.push(files[i].location);
      }
      console.log(reviewImgList);
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
        reviewImgList
      );
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCUESS_CREATE_REVIEW,
            review
          )
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  saveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.savedReview(reviewId, user);
      res
        .status(statusCode.OK)
        .send(
          util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_REVIEW)
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unSaveReview: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteSavedReview(reviewId, user);
      res
        .status(statusCode.OK)
        .send(
          util.success(statusCode.OK, responseMessage.SUCCESS_UNSAVED_REVIEW)
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  deleteMyReveiw: async (req, res) => {
    try {
      let { reviewId } = req.params;
      let user = req.header.user;
      await reviewService.deleteMyReview(reviewId, user);
      res
        .status(statusCode.OK)
        .send(
          util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_REVIEW)
        );
    } catch (err) {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
