const reviewUtils = require('../utils');
const {defaultBgImg} = require("../../../modules/definition");

const reviewOfBakeryDto = (findUser, reviewOfBakery, savedReviewList, likedReviewList, visitedBakeryList, likeCountList) => {
    return {
        reviewId: reviewOfBakery.id,
        reviewer: findUser.nickName,
        bakeryId: reviewOfBakery.BakeryId,
        content: reviewOfBakery.content,
        reviewImg: reviewOfBakery.reviewImgList.length < 1 ? defaultBgImg : reviewOfBakery.reviewImgList[0],
        purchaseBreadCount: reviewOfBakery.purchaseBreadList.length,
        reviewCreatedDate: reviewOfBakery.createdAt,
        isLikedReview: !!likedReviewList.includes(reviewOfBakery.id),
        isSavedReview: savedReviewList.map(review => review.UserId).includes(findUser.id),
        isVisitedReview: visitedBakeryList.includes(reviewOfBakery.BakeryId),
        likeReviewCount: reviewUtils.getCount(reviewOfBakery.id, likeCountList),
    };
};

module.exports = reviewOfBakeryDto;
