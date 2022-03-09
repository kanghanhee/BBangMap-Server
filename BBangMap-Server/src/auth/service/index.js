const userService = require('../../user/service');
const userUtil = require('../../user/util');
const jwt = require('../../../modules/jwt');
const loginDto = require('../dto/loginDto');

module.exports = {
  authLogin: async (identifyToken, provider) => {
    //identifyToken, authorizationCode, email, state, user, familyName, givenName, middleName, nickName
    try {
      let findUser = await userUtil.findUserByIdentifyToken(identifyToken);
      let accessToken;
      if (findUser == null) {
        //최초로그인유저 : 회원가입
        let nickName = (await userService.createRandomNickname()).nickname;
        findUser = await userUtil.createUser(identifyToken, nickName);
        accessToken = await jwt.sign(findUser);
        await userUtil.setUserToken(findUser, accessToken);

        return loginDto(accessToken, provider, findUser.nickName, false);
      }
      if (findUser.accessToken == null) {
        accessToken = await jwt.sign(findUser);
        await userUtil.setUserToken(findUser, accessToken);
      } else accessToken = findUser.accessToken;
      return loginDto(accessToken, provider, findUser.nickName, true);
    } catch (err) {
      return err;
    }
  },
  logout: async user => {
    try {
      await userUtil.setUserToken(user, null);
    } catch (err) {
      return err;
    }
  },
  reissueToken: async accessToken => {
    try {
      // accessToken이 가지고 있는 식별값으로 사용자를 찾아서 새로 발급
      const decode = await jwt.verify(accessToken);
      const findUser = await userUtil.findUserByDecodedId(decode.id);
      if (findUser == null) throw new Error('InvalidAccessToken');
      const newAccessToken = await jwt.sign(findUser);
      await userUtil.setUserToken(findUser, newAccessToken);

      return loginDto(newAccessToken, findUser.provider, findUser.nickName, true);
    } catch (err) {
      throw err;
    }
  },
};
