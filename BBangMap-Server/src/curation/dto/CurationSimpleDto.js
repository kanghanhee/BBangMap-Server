const curationSimpleDto = (curation) => {
    return {
        curationId : curation.id,
        curationImage : curation.curationImage,
        curator : curation.User.nickName,
        mainTitle : curation.mainTitle,
        subTitle : curation.subTitle,
        likeCurationCount : curation.LikerCuration.length
    }
}

module.exports = curationSimpleDto