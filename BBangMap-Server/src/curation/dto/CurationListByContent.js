const CurationSimpleDto = require('./CurationSimpleDto')

const curationListByContent = (content, user) =>{
    return {
        curationContentId : content.id,
        curationContentTitle : content.contentsTitle,
        contentViewType : content.id === 1 ? "banner" : "vertical_list",
        curationList : content.Curations.map(curation => CurationSimpleDto(curation, user))
    }
}

module.exports = curationListByContent;