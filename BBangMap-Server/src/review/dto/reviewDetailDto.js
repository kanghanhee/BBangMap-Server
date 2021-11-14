const reviewDetailDto = (review) => {
  return {
    reviewId: review.id,
    bakeryInfo: review.Bakery,
    purchaseBreadList: review.purchaseBreadList,
    content: review.content,
    reviewImg: review.reviewImgList,
    reviewerInfo: review.User,
    reviewCreatedDate: review.createdAt,
  };
};

module.exports = reviewDetailDto;
