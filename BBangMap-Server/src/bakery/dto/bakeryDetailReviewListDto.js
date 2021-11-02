const bakeryDetailReviewListDto = (review) =>{
    return {
        reviewId : review.id,
        purchaseBreadCount : review.purchaseBreadList.length,
        content : review.content,
        reviewImg : review.reviewImg[0]
    }
}

module.exports = bakeryDetailReviewListDto;