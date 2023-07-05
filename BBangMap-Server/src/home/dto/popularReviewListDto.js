const { findLikeReviewCount } = require('../../review/utils');

const popularReviewListDto = async popularReviewList => {
  const transformedReviewList = await Promise.all(
    popularReviewList.map(async item => {
      const likeReviewCount = await findLikeReviewCount(item.id);
      return {
        reviewId: item.id,
        reviewImg: item.reviewImgList.length !== 0 ? item.reviewImgList[0] : '',
        reviewer: item.User.nickName,
        content: item.content,
        createdAt: item.createdAt,
        bakeryName: item.Bakery.bakeryName,
        likeReviewCount: likeReviewCount.count,
      };
    }),
  );
  return transformedReviewList;
};

module.exports = { popularReviewListDto };
