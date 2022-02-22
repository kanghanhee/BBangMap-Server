const CurationSimpleDto = require('./CurationSimpleDto')

const curationListByContent = (content) =>{
    return {
        curationContentId : content.id,
        curationContentTitle : content.contentsTitle,
        curationList : content.Curations.map(curation => CurationSimpleDto(curation))
    }
}

module.exports = curationListByContent;