const jwt = require('../../../modules/jwt');
const bakeryUtils = require('../../bakery/utils');
const reviewUtils = require('../../review/utils');
const { homeListDto, nextReviewListDto } = require('../dto/homeListDto');

const parseList = list => {
  return list.map(item => JSON.parse(item));
};

module.exports = {
  getHomeDataList: async (redis, nextToken) => {
    let lastReviewId;
    if (nextToken) {
      lastReviewId = await jwt.verify(nextToken);
      const reviewList = await reviewUtils.findReviewAllByCursor(lastReviewId);

      return nextReviewListDto(reviewList);
    }
    const latestReviewId = await reviewUtils.findLatestReviewId();
    lastReviewId = latestReviewId.id;
    const popularBakeryList = await redis.zrevrange('popularBakery', 0, 9, 'WITHSCORES');
    const popularBreadList = await redis.zrevrange('popularBread', 0, 9, 'WITHSCORES');
    const popularAreaList = await redis.zrevrange('popularArea', 0, 9, 'WITHSCORES');
    const popularReviewList = await redis.zrevrange('popularReview', 0, 9);
    const bakeryList = await bakeryUtils.findBakeryByCreatedAt();
    const reviewList = await reviewUtils.findReviewAllByCursor(lastReviewId);

    redis.quit();

    return homeListDto(
      parseList(popularBakeryList),
      parseList(popularBreadList),
      parseList(popularAreaList),
      parseList(popularReviewList),
      bakeryList,
      reviewList,
    );
  },
};
