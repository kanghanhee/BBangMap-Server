const CurationDetailDto = require('./CurationDetailDto')

const curationDetailListDto = (userId, curation) => {
    return {
        curationContentId : curation.Contents.id,
        likeCurationCount : curation.LikerCuration.length,
        curationContentTitle : curation.Contents.contentsTitle,
        curator : curation.User.nickName,
        title : curation.mainTitle,
        subTitle : curation.subTitle,
        curatorComment : curation.curatorComment,
        isLikedCuration :curation.LikerCuration.map(liker => liker.id).includes(userId),
        isCertificated : curation.User.isCertificated,
        curationDetailList : curation.Targets.map(review => CurationDetailDto(review, userId)),
    }
}

module.exports = curationDetailListDto