const savedReviewOfBakeryDto = (savedReview) => {
  return {
    reviewId: savedReview.id,
    bakeryName: savedReview.Bakery.bakeryName,
    reviewImg:
      savedReview.reviewImgList.length < 1
        ? null
        : savedReview.reviewImgList[0],
    content: savedReview.content,
    reviewCreatedDate: savedReview.createdAt,
    purchaseBreadCount: savedReview.purchaseBreadList.length,
  };
};

module.exports = savedReviewOfBakeryDto;
