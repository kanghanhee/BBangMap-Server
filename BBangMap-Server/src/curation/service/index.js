const curationUtil = require('../utils')
const CurationListByContent = require('../dto/CurationListByContent')
const CurationDetailListDto = require('../dto/CurationDetailListDto')

module.exports = {
    addCuration: async (user, body, image) => {
        if (image === undefined) {
            throw new Error("CURATION_IMAGE_REQUIRE")
        }
        const {mainTitle, subTitle, curatorComment, reviewList, curationContentsId} = body;
        const findCurationContents = await curationUtil.findCurationContent(curationContentsId);
        await curationUtil.addCuration(
            user,
            mainTitle,
            subTitle,
            curatorComment,
            image.location,
            reviewList,
            findCurationContents
        );
    },
    getCurationList: async () => {
        const mainContentId = 1;
        const mainContent = await curationUtil.findCurationContentWithCuration(mainContentId);
        return CurationListByContent(mainContent)
    },
    getCurationDetail: async (userId, curationId) => {
        const findCuration = await curationUtil.findCuration(curationId);
        return CurationDetailListDto(userId, findCuration);
    },
    likeCuration: async (userId, curationId) => {
        const isLikeCuration = await curationUtil.isLikeCuration(userId, curationId);

        if (!isLikeCuration) {
            await curationUtil.createLikeCuration(userId, curationId);
        }else{
            throw new Error("ALREADY_LIKE_CURATION")
        }
    },
    cancelLikeCuration: async (userId, curationId) => {
        const isLikeCuration = await curationUtil.isLikeCuration(userId, curationId);

        if(isLikeCuration){
            await curationUtil.deleteLikeCuration(userId, curationId);
        }else{
            throw new Error("ALREADY_UNLIKE_CURATION")
        }
    }
}