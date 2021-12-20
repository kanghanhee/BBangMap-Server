const loginDto = (accessToken, provider) => {
    return {
        accessToken : accessToken,
        provider
    }
}

module.exports = loginDto;