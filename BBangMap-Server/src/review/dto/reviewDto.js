const reviewDto = (review, likedReviewList) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    content: review.content,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList[0],
    reviewCreatedDate: review.createdAt,
    purchaseBreadList: review.purchaseBreadList,
    isOnline: review.isOnline,
    isVegan: review.isVegan,
    isLikedReview: !!likedReviewList.includes(review.id),
  };
};

module.exports = reviewDto;
