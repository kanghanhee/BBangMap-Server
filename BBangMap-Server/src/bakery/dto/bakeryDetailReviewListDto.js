const bakeryDetailReviewListDto = (review) =>{
    return {
        reviewId : review.id,
        purchaseBreadCount : review.purchaseBreadList.length,
        content : review.content,
        reviewImg : getReviewImg(review.reviewImgList)
    }
}

const getReviewImg = (reviewImgList) => {
    return reviewImgList.length>0 ? reviewImgList[0] : [];
}

module.exports = bakeryDetailReviewListDto;