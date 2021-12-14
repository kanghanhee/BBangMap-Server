const userService = require('../../user/service')
const userUtil = require('../../user/util')
const jwt = require('../../../modules/jwt')
const loginDto = require('../dto/loginDto')

module.exports = {
    authLogin:async(authUserInfo, provider)=>{
        //identifyToken, authorizationCode, email, state, user, familyName, givenName, middleName, nickName
        const {identifyToken} = authUserInfo;
        try{
            let findUser = await userUtil.findUserByIdentifyToken(identifyToken);
            if(findUser == null){
                //최초로그인유저 : 회원가입
                let nickName = (await (userService.createRandomNickname())).nickname;
                findUser = await userUtil.createUser(identifyToken, nickName);
            }
            const tokenJson = await jwt.sign(findUser);
            await userUtil.setUserToken(findUser, tokenJson.accessToken, tokenJson.refreshToken);
            return loginDto(tokenJson, provider);
        }catch(err){
            return err;
        }
    }
}