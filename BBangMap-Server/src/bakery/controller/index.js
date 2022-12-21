const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const bakeryService = require('../service');
const slackSender = require('../../../other/slackSender');

module.exports = {
  bakeryMap: async (req, res) => {
    try {
      const { latitude, longitude, radius } = req.query;
      const { user } = req.header;
      const bakeryMapListDto = await bakeryService.getBakeryMap(user, latitude, longitude, radius);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryMapListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  bakerySearch: async (req, res) => {
    try {
      const { bakeryName, latitude, longitude } = req.query;
      const { user } = req.header;
      const bakerySearchListDto = await bakeryService.getSearchBakeryList(bakeryName, latitude, longitude, user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  /**
   * @빵집_가게명으로_검색하기
   * @route GET /search/name?q=
   * @access private
   */
  bakerySearchByName: async (req, res) => {
    try {
      const { q, latitude, longitude } = req.query;
      const { user } = req.header;
      const bakerySearchListDto = await bakeryService.getBakeryByName(q, latitude, longitude, user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  // /**
  //  * @빵집_빵으로_검색하기
  //  * @route GET /search/bread?type=&q=
  //  * @access private
  //  */
  // bakerySearchByBread: async (req, res) => {
  //   try {
  //     const { type, q, latitude, longitude } = req.query;
  //     const { user } = req.header;
  //     const bakerySearchListDto = await bakeryService.getBakeryByBread(type, q, latitude, longitude, user);
  //     return res
  //       .status(statusCode.OK)
  //       .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
  //   } catch (err) {
  //     slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
  //     return res
  //       .status(statusCode.INTERNAL_SERVER_ERROR)
  //       .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
  //   }
  // },
  // /**
  //  * @빵집_지역으로_검색하기
  //  * @route GET /search/name?q=
  //  * @access private
  //  */
  // bakerySearchByName: async (req, res) => {
  //   try {
  //     const { q, latitude, longitude } = req.query;
  //     const { user } = req.header;
  //     const bakerySearchListDto = await bakeryService.getBakeryByName(q, latitude, longitude, user);
  //     return res
  //       .status(statusCode.OK)
  //       .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakerySearchListDto));
  //   } catch (err) {
  //     slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
  //     return res
  //       .status(statusCode.INTERNAL_SERVER_ERROR)
  //       .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
  //   }
  // },
  bakeryDetail: async (req, res) => {
    try {
      const { bakeryId } = req.query;
      const { user } = req.header;
      const bakeryDetailDto = await bakeryService.getBakeryDetail(bakeryId, user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY, bakeryDetailDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  bakeryImgList: async (req, res) => {
    try {
      const { bakeryId } = req.query;
      const bakeryImgListDto = await bakeryService.getBakeryImgList(bakeryId);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, bakeryImgListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  storedBakeryList: async (req, res) => {
    try {
      const { user } = req.header;
      const savedBakeryListDto = await bakeryService.getSavedBakeryList(user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_IMG, savedBakeryListDto));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  storeBakery: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const { user } = req.header;
      await bakeryService.savedBakery(bakeryId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_BAKERY));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  unStoreBakery: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const { user } = req.header;
      await bakeryService.deleteSaveBakery(bakeryId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SAVED_BAKERY));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  doBakeryVisited: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const { user } = req.header;
      await bakeryService.doBakeryVisited(bakeryId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_VISITED_BAKERY));
    } catch (err) {
      if (err.message === 'NOT_EXIST_BAKERY') {
        slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else if (err.message === 'ALREADY_BAKERY_VISITED') {
        slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  cancelBakeryVisited: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const { user } = req.header;
      await bakeryService.cancelBakeryVisited(bakeryId, user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_CANCEL_VISITED_BAKERY));
    } catch (err) {
      if (err.message === 'NOT_EXIST_BAKERY') {
        slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else if (err.message === 'ALREADY_CANCEL_BAKERY_VISITED') {
        slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  registerBakery: async (req, res) => {
    try {
      const { body } = req;
      await bakeryService.createBakery(body);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_REGISTRATION_BAKERY));
    } catch (err) {
      //UQ or PK 값 중복 이슈 발생시 등록하려는 빵집 id의 중복
      // if (err.message === 'SequelizeUniqueConstraintError: Validation error') {
      //   // slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      //   // return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'NON_MATCHING_BAKERY_ID'));
      //bakeryName, address, latitude, longitude 중복
      // } else if (err.message === 'Error: DUPLICATE_INFO') {
      if (err.message === 'Error: DUPLICATE_INFO') {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'DUPLICATE_INFO'));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  bakeryListByAdmin: async (req, res) => {
    try {
      const bakeryList = await bakeryService.bakeryListByAdmin();
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LIST, bakeryList));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  bakeryDetailByAdmin: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const bakeryDetail = await bakeryService.bakeryDetailByAdmin(bakeryId);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_BAKERY_LIST, bakeryDetail));
    } catch (err) {
      //찾으려는 빵집 존재하지 않음
      if (err.message === 'NOT_EXIST_BAKERY') {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  bakeryModifyByAdmin: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      const { body } = req;
      await bakeryService.bakeryModify(bakeryId, body);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_BAKERY));
    } catch (err) {
      if (err.message === 'Error: DUPLICATE_INFO') {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'DUPLICATE_INFO'));
      } else if (err.message === 'Error: NOT_EXIST_BAKERY') {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'NOT_EXIST_BAKERY'));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  bakeryDelete: async (req, res) => {
    try {
      const { bakeryId } = req.params;
      await bakeryService.bakeryDelete(bakeryId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_BAKERY));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
  bakeryMainImage: async (req, res) => {
    try {
      const { bakeryId } = req.params;

      await bakeryService.updateBakeryMainImage(bakeryId, req.file);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_BAKERY_MAIN_IMAGE));
    } catch (err) {
      if (err.message === 'BAKERY_IMAGE_REQUIRE') {
        slackSender.sendError(statusCode.BAD_REQUEST, req.method.toUpperCase(), req.originalUrl, err);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message));
      } else {
        slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      }
    }
  },
  recentBakeryList: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await bakeryService.getRecentBakeryList(user);
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_RECENT_VISITED_BAKERY, result));
    } catch (err) {
      slackSender.sendError(statusCode.INTERNAL_SERVER_ERROR, req.method.toUpperCase(), req.originalUrl, err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
