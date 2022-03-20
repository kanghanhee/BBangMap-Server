const curationSimpleDto = (curation, user) => {
    return {
        curationId : curation.id,
        curationImage : curation.curationImage,
        curator : curation.User.nickName,
        title : curation.mainTitle,
        subTitle : curation.subTitle,
        isLikedCuration : curation.LikerCuration.map(likerCuration => likerCuration.id).includes(user.id),
        likeCurationCount : curation.LikerCuration.length
    }
}

module.exports = curationSimpleDto