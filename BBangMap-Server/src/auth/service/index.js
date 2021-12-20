const userService = require('../../user/service')
const userUtil = require('../../user/util')
const jwt = require('../../../modules/jwt')
const loginDto = require('../dto/loginDto')

module.exports = {
    authLogin: async (authUserInfo, provider) => {
        //identifyToken, authorizationCode, email, state, user, familyName, givenName, middleName, nickName
        const {identifyToken} = authUserInfo;
        try {
            let findUser = await userUtil.findUserByIdentifyToken(identifyToken);
            let accessToken;
            if (findUser == null) {
                //최초로그인유저 : 회원가입
                let nickName = (await (userService.createRandomNickname())).nickname;
                findUser = await userUtil.createUser(identifyToken, nickName);
                accessToken = await jwt.sign(findUser);
                await userUtil.setUserToken(findUser, accessToken);

                return loginDto(accessToken, provider);
            }
            if(findUser.accessToken == null){
                console.log('accessToken이 null')
                accessToken = await jwt.sign(findUser);
                await userUtil.setUserToken(findUser, accessToken);
            }else accessToken = findUser.accessToken;
            return loginDto(accessToken, provider);
        } catch (err) {
            return err;
        }
    },
    logout: async (user) => {
        try {
            await userUtil.setUserToken(user, null);
        } catch (err) {
            return err;
        }
    },
    reissueToken: async (accessToken) => {
        try {
            const findUser = await userUtil.findUserByAccessToken(accessToken);
            if(findUser == null) throw new Error("InvalidAccessToken");
            const newAccessToken = await jwt.sign(findUser);
            await userUtil.setUserToken(findUser, newAccessToken);

            return loginDto(newAccessToken, findUser.provider);
        } catch (err) {
            throw err;
        }
    }
}