const curationUtil = require('../utils')
const CurationDetailListDto = require('../dto/CurationDetailListDto')
const BakeryLocationInfoListDto = require('../dto/BakeryLocationInfoListDto')
const CurationContentList = require('../dto/CurationContentList')
const CurationListByAdminDto = require('../dto/curationListByAdminDto')

module.exports = {
    addCuration: async (body, image) => {
        if (image === undefined) {
            throw new Error("CURATION_IMAGE_REQUIRE")
        }

        const {mainTitle, subTitle, curatorComment, reviewerId, reviewIdList, curationContentId} = body;

        if (curationContentId != 1 && curationContentId != 2) {
            throw new Error("NOT_FOUND_CURATION_CONTENT")
        }
        await curationUtil.addCuration(
            reviewerId,
            mainTitle,
            subTitle,
            curatorComment,
            image.location,
            reviewIdList,
            curationContentId
        );
    },
    getCurationListByAdmin: async()=>{
       const result = await curationUtil.findCurationByContentId();
       // return result;
       return CurationListByAdminDto(result);
    },
    getCurationListWithCurationContent: async (user) => {
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
    },
    updateCuration: async (curationId, body) => {
        const {mainTitle, subTitle, curatorComment} = body;

        await curationUtil.updateCuration(curationId, mainTitle, subTitle, curatorComment)
    },
    updateCurationPriority: async (curationList, curationContentId) => {
        try{
            const checkDuplicateArr = new Array(curationList.length);

            for(let i=0;i<checkDuplicateArr.length;i++){
                if(!checkDuplicateArr.includes(curationList[i].priority)){
                    checkDuplicateArr[i] = curationList[i].priority
                }else{
                    throw Error("DUPLICATE_PRIORITY");
                }
            }
            await curationUtil.updateCurationPriority(curationContentId, curationList);
        }catch(err){
            throw new Error(err);
        }
    }
}