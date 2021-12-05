const util = require('../../../modules/util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const missionService = require('../service');
const { profileImg, bgImg } = require('../model/index');

module.exports = {
  // 회원가입
  signUp: async (req, res) => {
    try {
      const { uuid, nickname } = req.body;
      await missionService.signUp(uuid, nickname);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SIGN_UP));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  // 프로필 수정
  updateUser: async (req, res) => {
    try {
      const { user } = req.header;
      let profileImgName = '';
      let bgImgName = '';
      let nickname = '';
      if (req.files.profileImg) profileImgName = req.files.profileImg[0].location;
      if (req.files.backgroundImg) bgImgName = req.files.backgroundImg[0].location;
      if (req.body.nickname) nickname = req.body.nickname;
      const result = await missionService.updateUser(user, profileImgName, bgImgName, nickname);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_UPDATE_USER, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  // 프로필 삭제
  deleteUser: async (req, res) => {
    try {
      let { user } = req.header;
      const result = await missionService.deleteUser(user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_DELETE_USER, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  // 닉네임 중복검사
  checkNickname: async (req, res) => {
    try {
      const { nickname } = req.body;
      const result = await missionService.checkNickname(nickname);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_VERIFY_NICKNAME, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  // 랜덤 닉네임
  randomNickname: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await missionService.createRandomNickname(user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_NICKNAME, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  // 마이페이지
  getMyPage: async (req, res) => {
    try {
      const { user } = req.header;
      const result = await missionService.readMyPage(user);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_GET_MY_PAGE, result));
    } catch (err) {
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res.status(err.statusCode).send(util.fail(err.statusCode, err.responseMessage));
    }
  },
};
