const express = require("express");
const router = express.Router();
const userController = require("../../src/user/controller");
const authUtil = require("../../middlewares/authUtil");
const userUpload = require("../../modules/multer/userMulter");
const a = require("../../modules/multer/userMulter");

router.post("/", userController.signUp); //회원가입
const profileUpload = userUpload.fields([{
  name: 'profileImg',
  maxCount: 1
}, {
  name: 'backgroundImg',
  maxCount: 1
}]);

router.put(
  "/",
  authUtil.checkUuid,
  profileUpload,
  userController.updateUser
); //프로필 수정

router.delete("/", authUtil.checkUuid, userController.deleteUser); //프로필 삭제

router.post("/nickname", userController.checkNickname); //닉네임 중복검사
router.get("/random-nickname", userController.randomNickname); //랜덤 닉네임

router.get("/mypage", authUtil.checkUuid, userController.getMyPage); //마이페이지

module.exports = router;