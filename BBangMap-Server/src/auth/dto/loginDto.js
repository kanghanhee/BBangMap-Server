const loginDto = (token, provider) => {
    return {
        accessToken : token.accessToken,
        refreshToken : token.refreshToken,
        provider
    }
}

module.exports = loginDto;