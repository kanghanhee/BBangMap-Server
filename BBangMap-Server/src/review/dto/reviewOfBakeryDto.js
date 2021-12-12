const reviewOfBakeryDto = (reviewOfBakery, likedReviewList, likeCountList) => {
  return {
    reviewId: reviewOfBakery.id,
    bakeryId: reviewOfBakery.BakeryId,
    content: reviewOfBakery.content,
    reviewImg: reviewOfBakery.reviewImgList.length < 1 ? null : reviewOfBakery.reviewImgList[0],
    purchaseBreadCount: reviewOfBakery.purchaseBreadList.length,
    reviewCreatedDate: reviewOfBakery.createdAt,
    isLikedReview: !!likedReviewList.includes(reviewOfBakery.id),
    likeReviewCount: getCount(reviewOfBakery.id, likeCountList),
  };
};

const getCount = (reviewId, likeCountList) => {
  let count = likeCountList.filter(likeCount => likeCount === reviewId).length;
  return count;
};

module.exports = reviewOfBakeryDto;
