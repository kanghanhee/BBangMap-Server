const {Curation, CurationTarget, LikeCuration, CurationContent, MatchingCurationContents} = require('../../../models')

module.exports = {
    findCurationContents:async(curationContentsId)=>{
        const curationContent = await CurationContent.findOne({where : {id : curationContentsId}});
        if(curationContent == null) throw new Error("NOT_FOUND_CURATION_CONTENT")
        return curationContent
    },
    addCuration : async (user, mainTitle, subTitle, aWord, reviewList, curationContents)=>{
        try{
            const newCuration = await Curation.create({
                UserId : user.id,
                mainTitle,
                subTitle,
                aWord
            })
            await user.addCuration(newCuration);
            for (let reviewId of reviewList) {
                await CurationTarget.create({
                    CurationId : newCuration.id,
                    ReviewId : reviewId
                })
            }

            await MatchingCurationContents.create({
                CurationId : newCuration.id,
                CurationContentId : curationContents.id
            })
        }catch(err){
            throw err;
        }
    }
}