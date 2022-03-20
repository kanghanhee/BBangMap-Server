const CurationListByContent = require('./CurationListByContent')
const CurationContentList = async (contentList, user) => {
    return {
        curationListByContent : contentList.map(content => CurationListByContent(content, user))
    }
}

module.exports = CurationContentList;