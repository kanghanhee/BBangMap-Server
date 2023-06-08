const express = require('express');

const router = express.Router();
const userController = require('../../src/user/controller');
const authUtil = require('../../middlewares/authUtil');
const userUpload = require('../../modules/multer/userMulter');
const validationAppVersion = require('../../modules/validationAppVersion');

router.post('/', userController.signUp); // 회원가입
// 프로필 수정
router.put(
  '/',
  authUtil.checkToken,
  userUpload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'backgroundImg', maxCount: 1 },
  ]),
  userController.updateUser,
);
router.delete('/', authUtil.checkToken, userController.deleteUser); // 프로필 삭제
router.post('/nickname', userController.checkNickname); // 닉네임 중복검사
router.get('/random-nickname', userController.randomNickname); // 랜덤 닉네임
router.get('/mypage', authUtil.checkToken, validationAppVersion.getAppVersion, userController.getMyPage); // 마이페이지
router.put('/reward/visit', authUtil.checkToken, userController.updateVisitReward);

module.exports = router;
