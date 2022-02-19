const curationUtil = require('../utils')

module.exports = {
    addCuration: async (user, body, image) => {
        if(image === undefined) {throw new Error("큐레이션 이미지는 필수입니다.")}
        const {mainTitle, subTitle, aWord, reviewList, curationContentsId} = body;
        const findCurationContents = await curationUtil.findCurationContents(curationContentsId);
        await curationUtil.addCuration(
            user,
            mainTitle,
            subTitle,
            aWord,
            image.location,
            reviewList,
            findCurationContents
        );
    }
}