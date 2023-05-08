/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-throw-literal */
const userUtil = require('../util');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const { defaultBgImg, defaultProfileImg } = require('../../../modules/definition');
const myPageDto = require('../dto/myPageDto');
const reviewerInfoListDto = require('../dto/ReviewerInfoListDto')
const myPageDtoV2 = require("../dto/myPageDtoV2")
const rewardUtil = require("../../../modules/rewardUtil")

module.exports = {
  // 회원가입
  signUp: async (uuid, nickname) => {
    const checkUuid = await userUtil.isExistUser(uuid);
    const checkNickname = await userUtil.isExistNickname(nickname);
    // 이미 가입된 회원
    if (checkUuid)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_USER,
      };
    // 이미 있는 닉네임
    else if (checkNickname)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_NICKNAME,
      };
    // 회원가입 실행
    else {
      await userUtil.createUser(uuid, nickname);
    }
  },
  // 닉네임 중복체크
  checkNickname: async nickname => {
    const checkNickname = await userUtil.isExistNickname(nickname);
    if (checkNickname)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_NICKNAME,
      };
    // error : 현재 닉네임과 동일합니다.
  },
  // 회원 탈퇴
  deleteUser: async user => {
    await userUtil.reviewSetUnknown(user);
    await userUtil.deleteCascade(user);
  },
  // 프로필 수정
  updateUser: async (user, newProfileImg, newBgImg, newNickname) => {
    // 닉네임 중복검사(본인 제외)
    const checkNickname = await userUtil.isExistNickname(newNickname);
    if (checkNickname && newNickname !== user.nickName && newNickname)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_NICKNAME,
      };
    if (newProfileImg === 'default') newProfileImg = defaultProfileImg;
    if (newBgImg === 'default') newBgImg = defaultBgImg;

    if (!newProfileImg) newProfileImg = user.profileImg;
    if (!newBgImg) newBgImg = user.backgroundImg;
    if (!newNickname) newNickname = user.nickName;

    // 새로운 유저 정보
    const updateUser = {
      id: user.id,
      backgroundImg: newBgImg,
      profileImg: newProfileImg,
      nickname: newNickname,
    };
    // 유저정보 DB저장
    await userUtil.saveUpdateUser(updateUser);
  },
  // 랜덤 닉네임
  createRandomNickname: async () => {
    // readFile
    const firstList = await userUtil.readWordFile(`${__dirname}/../data/adjective`);
    const secondList = await userUtil.readWordFile(`${__dirname}/../data/second`);
    const thirdList = await userUtil.readWordFile(`${__dirname}/../data/bread`);
    let newNickname = '';
    while (true) {
      // random word
      let firstWord = await userUtil.randomNickname(firstList);
      let secondWord = await userUtil.randomNickname(secondList);
      let thirdWord = await userUtil.randomNickname(thirdList);

      newNickname = `${firstWord} ${secondWord} ${thirdWord}`;
      let checkNickname = await userUtil.isExistNickname(newNickname);
      if (!checkNickname) break;
    }
    return { nickname: newNickname };
  },
  readMyPage: async user => {
    const review = await userUtil.getMyReview(user);
    const savedBakery = await userUtil.getSavedBakery(user);
    const savedReview = await userUtil.getSavedReview(user);
    let grade = '';
    if (user.grade === 1) grade = '중력분';
    else if (user.grade === 2) grade = '강력분';
    else grade = '박력분';
    return myPageDto(user, grade, review.count, savedBakery.count, savedReview.count);
  },
  getUserInfo: async (nickname)=>{
    const userList = await userUtil.findUserByNickName(nickname);
    return reviewerInfoListDto(userList);
  },
  readMyPageV2: async user => {
    const review = await userUtil.getMyReview(user);
    const reward = rewardUtil.reward(user.reward);
    return myPageDtoV2(user, reward, review.count);
  }
};
