const userService = require('../../user/service');
const userUtil = require('../../user/util');
const jwt = require('../../../modules/jwt');
const loginDto = require('../dto/loginDto');

module.exports = {
  authLogin: async (identifyToken, provider, deviceToken) => {
    //identifyToken, authorizationCode, email, state, user, familyName, givenName, middleName, nickName
    try {
      let findUser = await userUtil.findUserByIdentifyToken(identifyToken);
      let accessToken;
      if (findUser == null) {
        //최초로그인유저 : 회원가입
        let nickName = (await userService.createRandomNickname()).nickname;
        findUser = await userUtil.createUser(identifyToken, nickName, deviceToken);
        accessToken = await jwt.sign(findUser);
        await userUtil.setUserToken(findUser, accessToken);

        return loginDto(accessToken, provider, findUser.nickName, false, deviceToken);
      }
      if (findUser.accessToken == null) {
        accessToken = await jwt.sign(findUser);
        await userUtil.setUserToken(findUser, accessToken);
      } else {
        accessToken = findUser.accessToken;
      }
      await userUtil.setUserDeviceToken(findUser, deviceToken);

      return loginDto(accessToken, provider, findUser.nickName, true, deviceToken);
    } catch (err) {
      return err;
    }
  },
  logout: async user => {
    try {
      await userUtil.setUserToken(user, null);
      await userUtil.setUserDeviceToken(user, '');
    } catch (err) {
      return err;
    }
  },
  reissueToken: async (accessToken, deviceToken) => {
    try {
      if (accessToken === null || accessToken === '') throw new Error('EmptyToken');
      const decode = await jwt.decode(accessToken);
      const findUser = await userUtil.findUserByDecodedId(decode.id);
      if (findUser == null) throw new Error('InvalidAccessToken');
      const newAccessToken = await jwt.sign(findUser);
      await userUtil.setUserToken(findUser, newAccessToken);
      // fcm token 재설정 해주기
      await userUtil.setUserDeviceToken(findUser, deviceToken);

      return loginDto(newAccessToken, findUser.provider, findUser.nickName, true);
    } catch (err) {
      throw err;
    }
  },
};
