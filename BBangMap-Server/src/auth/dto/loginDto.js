const loginDto = (accessToken, provider, nickName) => {
    return {
        accessToken : accessToken,
        provider,
        nickName
    }
}

module.exports = loginDto;