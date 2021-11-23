const reviewOfBakeryDto = (reviewOfBakery) => {
  return {
    reviewId: reviewOfBakery.id,
    bakeryId: reviewOfBakery.BakeryId,
    content: reviewOfBakery.content,
    reviewImg:
      reviewOfBakery.reviewImgList.length < 1
        ? null
        : reviewOfBakery.reviewImgList[0],
    purchaseBreadCount: reviewOfBakery.purchaseBreadList.length,
    reviewCreatedDate: reviewOfBakery.createdAt,
  };
};

module.exports = reviewOfBakeryDto;
