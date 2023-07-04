const Redis = require('ioredis');
const slackSender = require('../other/slackSender');

const env = process.env.NODE_ENV || 'test';
const config = require('../config/config.json')[env];

const redisMiddleware = (req, res, next) => {
  const redisClient = new Redis(config.redis);

  redisClient.on('error', error => {
    console.error('Redis 연결 에러:', error);
    slackSender.sendError('500', 'Redis 연결 에러', req.originalUrl, error);
  });
  req.redis = redisClient;

  next();
};

module.exports = redisMiddleware;
