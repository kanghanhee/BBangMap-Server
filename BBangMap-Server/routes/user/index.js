const express = require("express");
const router = express.Router();
const missionController = require("../../src/user/controller");
const authUtil = require("../../middlewares/authUtil");

router.post("/",  missionController.signUp);//회원가입
router.put("/", authUtil.checkUuid, missionController.updateUser);//프로필 수정
router.delete("/", authUtil.checkUuid, missionController.deleteUser);//프로필 삭제

router.post("/nickname", missionController.checkNickname);//닉네임 중복검사
router.get(
  "/random-nickname",
  missionController.randomNickname
);//랜덤 닉네임

router.get("/mypage", authUtil.checkUuid, missionController.getMyPage);//마이페이지

module.exports = router;
