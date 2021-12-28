const loginDto = (accessToken, provider, nickName, isLogin) => {
    return {
        accessToken : accessToken,
        provider,
        nickName,
        isLogin
    }
}

module.exports = loginDto;