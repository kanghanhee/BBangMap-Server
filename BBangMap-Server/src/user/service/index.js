const userUtil = require("../util");
const responseMessage = require("../../../modules/responseMessage");
const statusCode = require("../../../modules/statusCode");

module.exports = {
  //회원가입
  signUp: async (uuid, nickname) => {
    const checkUuid = await userUtil.isExistUser(uuid);
    const checkNickname = await userUtil.isExistNickname(nickname);
    //이미 가입된 회원
    if (checkUuid)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_USER,
      };
    //이미 있는 닉네임
    else if (checkNickname)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_NICKNAME,
      };
    //회원가입 실행
    else {
      await userUtil.createUser(uuid, nickname);
    }
  },
  //닉네임 중복체크
  checkNickname: async (nickname) => {
    const checkNickname = await userUtil.isExistNickname(nickname);
    if (checkNickname)
      throw {
        statusCode: statusCode.CONFLICT,
        responseMessage: responseMessage.ALREADY_NICKNAME,
      };
  },
  //회원 탈퇴
  deleteUser: async (user) => {
    const deleteOthers = userUtil.deleteCascade(user);
    const reviewList = userUtil.deleteSetNull(user);
    //후기 리스트 -> set null, NOT IN 속성 사용
    // 나머지는 cascade
    //좋아요 리스트,보관내역(빵집,후기),미션 내역,사용자 정보 삭제
  },
  //프로필 수정
  updateUser: async (user, newBgImg, newProfileImg, newNickname) => {
    try {
      //닉네임 중복검사
      const checkNickname = await userUtil.isExistNickname(nickname);
      if (checkNickname)
        throw {
          statusCode: statusCode.CONFLICT,
          responseMessage: responseMessage.ALREADY_NICKNAME,
        };
      //이미지 저장
      console.log(req.profileImg.filename);
      console.log(req.backgroundImg.filename);
      if (newProfileImg == null) newProfileImg = user.profileImg; //변경 없음
      if (newBgImg == null) newBgImg = user.backgroudImg;
      if (newNickname == null) newNickname = user.nickName;
      //새로운 유저 정보
      const updateUser = {
        backgroundImg: newBgImg,
        profileImg: newProfileImg,
        nickname: newNickname,
      };

      //유저정보 DB저장
      await userUtil.saveUpdateUser(updateUser);
    } catch (err) {
      console.error();
    }
  },
  //랜덤 닉네임
  createRandomNickname: async () => {
    //readFile
    const firstList = await userUtil.readWordFile("./data/adj");
    const secondList = await userUtil.readWordFile("./data/second");
    const thirdList = await userUtil.readWordFile("./data/bread");
    let newNickname = "";
    while (true) {
      //random word
      let firstWord = userUtil.randomNickname(firstList);
      let secondWord = userUtil.randomNickname(secondList);
      let thirdWord = userUtil.randomNickname(thirdList);

      newNickname = firstWord + secondWord + thirdWord;
      console.log(newNickname);
      let checkNickname = await userUtil.isExistNickname(newNickname);
      if (!checkNickname) break;
    }
    return newNickname;
  },
  readMyPage: async (user) => {
    //닉네임,등급,유저이미지,배경이미지
    //내가 쓴 후기개수(review. userId=id)
    //빵집 보관함개수()(saveBakery.findAll userID=id.length)
    //후기 보관함 개수(saveReview.findAll userId=id .length)
  },
};
