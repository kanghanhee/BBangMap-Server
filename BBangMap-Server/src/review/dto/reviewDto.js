const {defaultBgImg} = require('../../../modules/definition');

const detailDto = (review) => {
    if (typeof review.reviewImgList === "string") {
        review.reviewImgList = JSON.parse(review.reviewImgList);

    }
    return {
        reviewId: review.id,
        bakeryName: review.bakeryName,
        content: review.content,
        reviewer: review.nickName,
        reviewImg: review.reviewImgList.length < 1 ? defaultBgImg : review.reviewImgList[0],
        reviewCreatedDate: new Date(review.createdAt + 'z'),
        purchaseBreadList: review.purchaseBreadList,
        isOnline: review.isOnline,
        isVegan: review.isVegan,
        isLikedReview: review.isLikedReview != null,
        likeReviewCount: review.likeReviewCount,
        isSaveReview: review.isSaveReview != null,
        isVisitedBakery: review.isVisitedBakery != null
    };
};

const summaryDto = review => {
    return {
        reviewId: review.id,
        userId: review.UserId,
        bakeryId: parseInt(review.BakeryId, 10),
        star: parseInt(review.star, 10),
        content: review.content,
        reviewImgList: review.reviewImgList,
        purchaseBreadList: review.purchaseBreadList,
    };
};

module.exports = {detailDto, summaryDto};
