const {defaultBgImg} = require("../../../modules/definition");
const bakeryDetailReviewListDto = (review, userId) =>{
    return {
        reviewId : review.id,
        reviewer: review.User.nickName,
        purchaseBreadCount : review.purchaseBreadList.length,
        content : review.content,
        reviewCreatedDate : new Date(review.createdAt+"z"),
        likeReviewCount : review.Liker.length,
        isLikedReview : likeThisReview(review.Liker, userId),
        isSavedReview : saveThisReview(review.SaverReview, userId),
        reviewImg : getReviewImg(review.reviewImgList),
    }
}

const getReviewImg = (reviewImgList) => {
    return reviewImgList.length>0 ? reviewImgList[0] : defaultBgImg;
}

const likeThisReview = (reviewLikerList, userId) => {
    let isUserLikeThisReviewList = reviewLikerList.map(liker => liker.id === userId);
    return isUserLikeThisReviewList.includes(true);
}

const saveThisReview = (reviewSaverList, userId) =>{
    let isUserSaverThisReviewList = reviewSaverList.map(saver => saver.id === userId);
    return isUserSaverThisReviewList.includes(true);
}

module.exports = bakeryDetailReviewListDto;