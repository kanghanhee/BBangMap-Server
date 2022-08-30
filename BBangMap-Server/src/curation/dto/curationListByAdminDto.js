const curationListByAdminDto = async (curationListByAdmin) => {
    return curationListByAdmin.map(curation => {
        return {
            curationId : curation.CurationId,
            curationContentId : curation.CurationContentId,
            priority : curation.priority,
            contentsTitle : curation.contentsTitle,
            mainTitle : curation.mainTitle,
            subTitle : curation.subTitle,
            curationImage : curation.curationImage,
            curator : curation.nickName,
            curatorComment : curation.curatorComment
        }
    })
}

module.exports = curationListByAdminDto;