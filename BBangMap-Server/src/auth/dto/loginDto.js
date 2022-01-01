const loginDto = (accessToken, provider, nickname, isLogin) => {
    return {
        accessToken : accessToken,
        provider,
        nickname,
        isLogin
    }
}

module.exports = loginDto;