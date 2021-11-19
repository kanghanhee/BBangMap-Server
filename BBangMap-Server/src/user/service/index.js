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
    try {
      //후기 리스트 id 변경
      //좋아요 리스트 삭제
      //보관 내역 삭제
      //미션 내역(뱃지 리스트, userMission) 삭제
      //사용자 삭제
    } catch (err) {}
  },
  //프로필 수정(배경사진, 프로필사진, 닉네임-> 이미지는 다른 방식으로 해결해야함)
  updateUser: async (user, newBgImg, newProfileImg, newNickname) => {
    try {
      const updateUser = {
        ...user,
        backgroundImg: newBgImg,
        profileImg: newProfileImg,
        nickname: newNickname,
      };
    } catch (err) {
      console.error();
    }
  },
  //랜덤 닉네임
  createRandomNickname: async () => {
    //readFile
    const firstList = await readFile("./data/adj");
    const secondList = await readFile("./data/second");
    const thirdList = await readFile("./data/bread");
    let newNickname = "";
    while (true) {
      //random word
      let firstWord = userUtil.randomNickname(first);
      let secondWord = userUtil.randomNickname(second);
      let thirdWord = userUtil.randomNickname(third);

      newNickname = newFirst + newSecond + newThird;
      console.log(newNickname);
      let checkNickname = await userUtil.isExistNickname(newNickname);
      if (!checkNickname) break;
    }
    return newNickname;
  },
  readMyPage: async () => {},
};
