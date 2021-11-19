const util = require("../../../modules/util");
const responseMessage = require("../../../modules/responseMessage");
const statusCode = require("../../../modules/statusCode");
const missionService = require("../service");

module.exports = {
  //회원가입
  signUp: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.signUp(user);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SUCCESS_SIGN_UP));
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  //프로필 수정
  updateUser: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.updateUser(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_UPDATE_USER,
            result
          )
        );
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  //프로필 삭제
  deleteUser: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.deleteUser(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_DELETE_USER,
            result
          )
        );
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  //닉네임 중복검사
  checkNickname: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.checkNickname(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_VERIFY_NICKNAME,
            result
          )
        );
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  //랜덤 닉네임
  randomNickname: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.createRandomNickname(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_NICKNAME,
            result
          )
        );
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
  //마이페이지
  getMyPage: async (req, res) => {
    try {
      let user = req.header.user;
      const result = await missionService.readMyPage(user);
      res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.SUCCESS_GET_MYPAGE,
            result
          )
        );
    } catch (err) {
      console.log(err);
      if (err.statusCode == null) {
        err.statusCode = statusCode.INTERNAL_SERVER_ERROR;
        err.responseMessage = responseMessage.INTERNAL_SERVER_ERROR;
      }
      return res
        .status(err.statusCode)
        .send(util.fail(err.statusCode, err.responseMessage));
    }
  },
};
