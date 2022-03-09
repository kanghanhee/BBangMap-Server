const jwt = require('jsonwebtoken')
const secretKey = require('../config/secretJwtKey').secretKey
const options = require('../config/secretJwtKey').option
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user.id,
            nickname: user.nickName
        };
        return jwt.sign(payload, secretKey, options);
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            }
            if (err.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            }
            console.log('invalid token');
            return TOKEN_INVALID;
        }
        return decoded;
    },
    decode: async (token) => {
        return jwt.decode(token);
    }
}
