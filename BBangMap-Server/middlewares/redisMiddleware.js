const Redis = require('ioredis');

const env = process.env.NODE_ENV || 'test';
const config = require('../config/config.json')[env];

const redisMiddleware = (req, res, next) => {
  const redisClient = new Redis(config.redis);

  redisClient.on('error', error => {
    console.error('Redis 에러:', error.message);
    redisClient.quit();
  });
  req.redis = redisClient;

  next();
};

module.exports = redisMiddleware;
