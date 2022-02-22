const bakeryDetailReviewListDto = (review, userId) =>{
    return {
        reviewId : review.id,
        reviewer: review.User.nickName,
        purchaseBreadCount : review.purchaseBreadList.length,
        content : review.content,
        reviewCreatedDate : review.createdAt,
        likeReviewCount : review.Liker.length,
        isLikedReview : likeThisReview(review.Liker, userId),
        reviewImg : getReviewImg(review.reviewImgList)
    }
}

const getReviewImg = (reviewImgList) => {
    return reviewImgList.length>0 ? reviewImgList[0] : null;
}

const likeThisReview = (reviewLikerList, userId) => {
    let isUserLikeThisReviewList = reviewLikerList.map(liker => liker.id === userId);
    return isUserLikeThisReviewList.includes(true);
}

module.exports = bakeryDetailReviewListDto;