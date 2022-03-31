const {
    Curation,
    CurationTarget,
    LikeCuration,
    CurationContent,
    MatchingCurationContents,
    User,
    Review,
    Bakery
} = require('../../../models')
const {Sequelize} = require("sequelize");

module.exports = {
    findCurationContent: async (curationContentsId) => {
        const curationContent = await CurationContent.findOne({where: {id: curationContentsId}});
        if (curationContent == null) throw new Error("NOT_FOUND_CURATION_CONTENT")
        return curationContent
    },
    addCuration: async (user, mainTitle, subTitle, aWord, curationImage, reviewList, curationContents) => {
        try {
            const newCuration = await Curation.create({
                UserId: user.id,
                mainTitle,
                subTitle,
                aWord,
                curationImage
            })
            await user.addCuration(newCuration);
            for (let reviewId of reviewList) {
                await CurationTarget.create({
                    CurationId: newCuration.id,
                    ReviewId: reviewId
                })
            }

            await MatchingCurationContents.create({
                CurationId: newCuration.id,
                CurationContentId: curationContents.id
            })
        } catch (err) {
            throw err;
        }
    },
    findCurationContentWithCuration: async (curationContentId) => {
        const curationContent = await CurationContent.findOne(
            {
                where: {id: curationContentId},
                include: [
                    {
                        model: Curation,
                        as: 'Curations',
                        include: [
                            {
                                model: User,
                            },
                            {
                                model: User,
                                as: 'LikerCuration',
                                attributes: ['id']
                            }]
                    }
                ]
            }
        );
        if (curationContent == null) throw new Error("NOT_FOUND_CURATION_CONTENT")
        return curationContent
    },
    findAllCurationContentWithCuration: async () => {
      return await CurationContent.findAll({
          include:[
              {
                  model: Curation,
                  as: 'Curations',
                  include:[
                      {
                          model: User,
                      },
                      {
                          model: User,
                          as: 'LikerCuration',
                          attributes: ['id']
                      }
                  ]
              }
          ],
          order: [Sequelize.literal("`Curations->MatchingCurationContents`.`priority`", 'ASC')]
      })
    },
    findCuration: async (curationId) => {
        const curation = await Curation.findOne(
            {
                where: {id: curationId},
                include: [
                    {
                        model: CurationContent,
                        as: 'Contents'
                    },
                    {
                        model: User
                    },
                    {
                        model: User,
                        as: 'LikerCuration',
                        attributes: ['id']
                    },
                    {
                        model: Review,
                        as: 'Targets',
                        include: [
                            {
                                model: Bakery,
                                include: [
                                    {
                                        model: User,
                                        as: 'VisiterBakery',
                                        attributes: ['id']
                                    }, {
                                        model: User,
                                        as: 'SaverBakery',
                                        attributes: ['id']
                                    }, {
                                        model: Review,
                                    }
                                ]
                            },
                            {
                                model: User,
                                as: 'SaverReview',
                                attributes: ['id']
                            },
                            {
                                model: User
                            }
                        ]
                    }
                ]
            }
        )
        if (curation == null) throw new Error("NOT_FOUND_CURATION");
        return curation
    },
    isLikeCuration: async (userId, curationId) => {
        const findLikeCuration = await LikeCuration.findOne({where: {UserId: userId, CurationId: curationId}})
        return findLikeCuration != null;
    },
    createLikeCuration: async (userId, curationId) => {
        await LikeCuration.create({
            UserId: userId,
            CurationId: curationId
        })
    },
    deleteLikeCuration: async (userId, curationId) => {
        await LikeCuration.destroy({
            where: {
                UserId: userId,
                CurationId: curationId
            }
        })
    }
}