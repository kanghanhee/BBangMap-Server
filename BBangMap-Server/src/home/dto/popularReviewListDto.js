const { findLikeReviewCount } = require('../../review/utils');

const popularReviewListDto = async popularReviewList => {
  return popularReviewList.reduce(async (result, item, index) => {
    if (index % 2 === 0) {
      const likeReviewCount = await findLikeReviewCount(item.id);
      const review = {
        reviewId: item.id,
        reviewImg: item.reviewImgList.length !== 0 ? item.reviewImgList[0] : '',
        reviewer: item.User.nickName,
        content: item.content,
        createdAt: item.createdAt,
        bakeryName: item.Bakery.bakeryName,
        likeReviewCount: likeReviewCount.count,
      };
      result.push(review);
    }
    return result;
  }, []);
};

module.exports = { popularReviewListDto };
