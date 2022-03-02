const CurationDetailDto = require('./CurationDetailDto')

const curationDetailListDto = (userId, curation) => {
    return {
        curationContentId : curation.Contents.id,
        likeCurationCount : curation.LikerCuration.length,
        isLikedCuration :curation.LikerCuration.map(liker => liker.id).includes(userId),
        curationContentTitle : curation.Contents.contentsTitle,
        curator : curation.User.nickName,
        mainTitle : curation.mainTitle,
        subTitle : curation.subTitle,
        curatorComment : curation.curatorComment,
        curationDetailList : curation.Targets.map(review => CurationDetailDto(review, userId))
    }
}

module.exports = curationDetailListDto