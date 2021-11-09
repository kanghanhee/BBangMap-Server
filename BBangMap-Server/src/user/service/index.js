const userUtil = require("../util");
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
      if(existNickname) throw Error
      // if(existNickname) -> error 409
      // throw 409,중복된 닉네임입니다.
    } catch (err) {}
  },
  //회원 탈퇴
  deleteUser:async(uuid,nickname)=>{
      //닉네임 -> 탈퇴 회원
      try{

      }catch(err){

      }
  }, 
  //프로필 수정(배경사진, 프로필사진, 닉네임) 
}; 