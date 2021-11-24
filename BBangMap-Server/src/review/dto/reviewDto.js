const reviewDto = (review) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    content: review.content,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList[0],
    reviewCreatedDate: review.createdAt,
    purchase: review.purchaseBreadList,
  };
};

module.exports = reviewDto;
