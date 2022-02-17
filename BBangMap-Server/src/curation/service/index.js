const curationUtil = require('../utils')

module.exports = {
    addCuration: async (user, body) => {
        console.log('body : ',body)
        const {mainTitle, subTitle, aWord, reviewList, curationContentsId} = body;
        const findCurationContents = await curationUtil.findCurationContents(curationContentsId);
        //curationContents가 없을때 예외처리 만들어줘야함.
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