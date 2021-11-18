const userUtil = require("../util");
const responseMessage = require("../../../modules/responseMessage");
const statusCode = require("../../../modules/statusCode");
module.exports = {
  //회원가입
  signUp: async (uuid, nickname) => {
    try {
      this.checkNickname(nickname);
      //db create
      const newUser = await userUtil.createUser(uuid, nickname);
    } catch (err) {
      console.error();
    }
  },
  //닉네임 중복체크
  checkNickname: async (nickname) => {
    try {
      const existNickname = await userUtil.isExistNickname(nickname);
      if (existNickname) throw Error;
      // if(existNickname) -> error 409
      // throw 409,중복된 닉네임입니다.
    } catch (err) {}
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
  randomNickname: async () => {
    //while(true){}
    //배열
    //닉네임 중복 시,새로 가져오기
  },
};
