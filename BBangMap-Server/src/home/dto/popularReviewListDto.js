const { findLikeReviewCount } = require('../../review/utils');

const popularReviewListDto = async reviewList => {
  const popularReviewList = await Promise.all(
    reviewList.map(async item => {
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
  return popularReviewList;
};

module.exports = { popularReviewListDto };
