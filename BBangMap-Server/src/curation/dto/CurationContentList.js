const CurationListByContent = require('./CurationListByContent')
const CurationContentList = async (contentList) => {
    return {
        curationListByContent : contentList.map(content => CurationListByContent(content))
    }
}

module.exports = CurationContentList;