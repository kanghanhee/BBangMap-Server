const reviewUtils = require('../utils');

const reviewOfBakeryDto = (reviewOfBakery, likedReviewList, likeCountList) => {
  return {
    reviewId: reviewOfBakery.id,
    bakeryId: reviewOfBakery.BakeryId,
    content: reviewOfBakery.content,
    reviewImg: reviewOfBakery.reviewImgList.length < 1 ? null : reviewOfBakery.reviewImgList[0],
    purchaseBreadCount: reviewOfBakery.purchaseBreadList.length,
    reviewCreatedDate: reviewOfBakery.createdAt,
    isLikedReview: !!likedReviewList.includes(reviewOfBakery.id),
    likeReviewCount: reviewUtils.getCount(reviewOfBakery.id, likeCountList),
  };
};

module.exports = reviewOfBakeryDto;
