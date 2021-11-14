const reviewDto = (review) => {
  return {
    reviewId: review.id,
    bakeryInfo: review.Bakery,
    content: review.content,
    reviewImg: review.reviewImgList[0],
    reviewCreatedDate: review.createdAt,
    isOnline: review.isOnline,
    isVegan: review.isVegan,
    purchase: review.purchaseBreadList,
  };
};

module.exports = reviewDto;
