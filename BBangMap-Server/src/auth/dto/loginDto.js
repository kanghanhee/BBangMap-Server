const loginDto = (accessToken, provider, nickname, isLogin, deviceToken) => {
  return {
    accessToken,
    provider,
    nickname,
    isLogin,
    deviceToken,
  };
};

module.exports = loginDto;
