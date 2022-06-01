const reviewerInfoDto = (user)=>{
    return {
        id : user.id,
        nickname : user.nickName
    }
}

module.exports = reviewerInfoDto;