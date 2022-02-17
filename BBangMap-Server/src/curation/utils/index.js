const {Curation, CurationTarget, LikeCuration, CurationContent, MatchingCurationContents} = require('../../../models')

module.exports = {
    findCurationContents:async(curationContentsId)=>{
        return CurationContent.findOne({where : {id : curationContentsId}});
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