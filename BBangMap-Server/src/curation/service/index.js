const curationUtil = require('../utils')
const CurationDetailListDto = require('../dto/CurationDetailListDto')
const BakeryLocationInfoListDto = require('../dto/BakeryLocationInfoListDto')
const CurationContentList = require('../dto/CurationContentList')

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
    getCurationList: async (user) => {
        const allContent = await curationUtil.findAllCurationContentWithCuration();
        return CurationContentList(allContent, user);
    },
    getCurationDetail: async (userId, curationId) => {
        const findCuration = await curationUtil.findCuration(curationId);
        return CurationDetailListDto(userId, findCuration);
    },
    likeCuration: async (userId, curationId) => {
        const isLikeCuration = await curationUtil.isLikeCuration(userId, curationId);

        if (!isLikeCuration) {
            await curationUtil.createLikeCuration(userId, curationId);
        } else {
            throw new Error("ALREADY_LIKE_CURATION")
        }
    },
    cancelLikeCuration: async (userId, curationId) => {
        const isLikeCuration = await curationUtil.isLikeCuration(userId, curationId);

        if (isLikeCuration) {
            await curationUtil.deleteLikeCuration(userId, curationId);
        } else {
            throw new Error("ALREADY_UNLIKE_CURATION")
        }
    },
    getBakeryLocationInfo: async (userId, curationId) => {
        const findCuration = await curationUtil.findCuration(curationId);
        const curationsBakeryList = findCuration.Targets.map(target => target.Bakery);
        return BakeryLocationInfoListDto(curationsBakeryList, userId);
    },
    getCurationContent: async () => {
        const curationContentList = [{"id": 1}, {"id": 2}];
        return curationContentList;
    }
}