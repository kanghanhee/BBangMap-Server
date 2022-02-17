const curationUtil = require('../utils')

module.exports = {
    addCuration: async (user, body) => {
        const {mainTitle, subTitle, aWord, reviewList, curationContentsId} = body;
        const findCurationContents = await curationUtil.findCurationContents(curationContentsId);
        await curationUtil.addCuration(
            user,
            mainTitle,
            subTitle,
            aWord,
            reviewList,
            findCurationContents
        );
    }
}