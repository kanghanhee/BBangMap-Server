const curationSimpleDto = (curation) => {
    return {
        curationId : curation.id,
        curator : curation.User.nickName,
        mainTitle : curation.mainTitle,
        subTitle : curation.subTitle,
        likeCurationCount : curation.LikerCuration.length
    }
}

module.exports = curationSimpleDto