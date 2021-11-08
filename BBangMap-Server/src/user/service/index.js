const userUtil = require("../util");
module.exports = {
    //회원가입
    signUp: async (uuid, nickname) => {
        try {
            //닉네임 중복체크
            const existNickname = await userUtil.isExistNickname(nickname)
            // if(existNickname) -> error 409
            // throw 409,중복된 닉네임입니다.
            //db create
            const newUser = await userUtil.createUser(uuid, nickname)
        } catch (error) {
            console.error()
        }
    }

}