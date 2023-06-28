const { Op, Sequelize } = require('sequelize');
const { sequelize } = require('../../../models/index');
const { Bakery, Review, User, SaveReview, LikeReview, VisitBakery, RewardHistory } = require('../../../models');
const { reviewDelete } = require('../../../modules/multer/reviewMulter');

module.exports = {
  findReviewOfBakery: async bakeryId => {
    return Review.findAll({
      where: {
        BakeryId: bakeryId,
      },
      include: [
        {
          model: User,
          attributes: ['nickName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  findReviewAll: async(customOffset, customLimit, order, userId) => {
    return sequelize.query(
        `SELECT Review.*, User.nickName, Bakery.*, SaveReview.*, VisitBakery.*, LikeReview.*
         FROM (SELECT Review.*,
                      (SELECT COUNT(lr.ReviewId)
                       FROM LikeReview AS lr
                       WHERE lr.ReviewId = Review.id) AS likeReviewCount
               FROM Review
               ORDER BY ${order} DESC) AS Review
            LEFT OUTER JOIN (SELECT id as BakeryIdx, bakeryName, bakeryImg FROM Bakery) as Bakery
                    ON Review.BakeryId = Bakery.BakeryIdx
            LEFT OUTER JOIN (SELECT ReviewId, UserId as isLikedReview FROM LikeReview WHERE LikeReview.UserId = ${userId}) as LikeReview 
                    ON Review.id = LikeReview.ReviewId
            LEFT OUTER JOIN (SELECT BakeryId, UserId as isVisitedBakery FROM VisitBakery WHERE VisitBakery.UserId = ${userId}) as VisitBakery
                    ON Bakery.BakeryIdx = VisitBakery.BakeryId
            LEFT OUTER JOIN (SELECT id as UserIdx, nickName FROM User) as User
                    ON Review.UserId = User.UserIdx
           LEFT OUTER JOIN (SELECT ReviewId, UserId as isSaveReview FROM SaveReview where SaveReview.UserId = ${userId}) as SaveReview 
                    ON Review.id = SaveReview.ReviewId
           LIMIT ${customOffset}, ${customLimit}`,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        },
    )
  },
  findReviewSearch: async (searchWord, isOnline, isVegan, offset, limit, order) => {
    let whereClause = {
      [Op.and]: {},
    };
    if (searchWord.length > 0) {
      whereClause[Op.and] = { [Op.or]: {} };
      whereClause[Op.and][Op.or][`$Bakery.bakeryName$`] = { [Op.like]: `%${searchWord}%` };
      whereClause[Op.and][Op.or]['$Review.purchaseBreadList$'] = { [Op.like]: `%${searchWord}%` };
    }
    if (isOnline) whereClause[Op.and][`$Bakery.isOnline$`] = isOnline;
    if (isVegan) whereClause[Op.and][`$Bakery.isVegan$`] = isVegan;

    return Review.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(lr.ReviewId)
            FROM LikeReview AS lr
            WHERE lr.ReviewId = Review.id
          )`),
            'likeReviewCount',
          ],
        ],
      },
      include: [
        {
          model: Bakery,
          as: 'Bakery',
          attributes: ['bakeryName', 'isOnline', 'isVegan'],
          include: [
            {
              model: User,
              as: 'VisiterBakery',
            },
          ],
          where: whereClause,
        },
        {
          model: User,
          as: 'SaverReview',
        },
        {
          model: User,
          as: 'Liker',
        },
        {
          model: User,
          attributes: ['nickName'],
        },
      ],
      offset,
      limit,
      order: [[Sequelize.literal(order), 'DESC']],
    });
  },
  findReviewById: async reviewId => {
    return Review.findOne({
      where: {
        id: reviewId,
      },
      include: [
        {
          model: User,
          attributes: ['nickName', 'profileImg'],
        },
        {
          model: Bakery,
          attributes: ['bakeryName'],
          include: [
            {
              model: User,
              as: 'VisiterBakery',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  findReviewBakeryById: async reviewId => {
    return Review.findOne({
      where: {
        id: reviewId,
      },
      include: [
        {
          model: User,
          attributes: ['nickName', 'profileImg'],
        },
        {
          model: Bakery,
          attributes: ['bakeryName', 'address', 'latitude', 'longitude'],
          include: [
            {
              model: User,
              as: 'VisiterBakery',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  findUsersSavedReviewList: async user => {
    return SaveReview.findAll({
      where: { UserId: user.id },
    });
  },
  findUsersLikedReviewList: async user => {
    return LikeReview.findAll({
      where: { UserId: user.id },
    });
  },
  findMyReviewList: async user => {
    return Review.findAll({
      where: { UserId: user.id },
      include: [
        {
          model: Bakery,
          attributes: ['bakeryName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  addReview: async (user, bakeryId, isVegan, isOnline, purchaseBreadList, star, content, reviewImgList) => {
    return await Review.create({
      UserId: user.id,
      BakeryId: bakeryId,
      isVegan: isVegan,
      isOnline: isOnline,
      purchaseBreadList: purchaseBreadList,
      star: star,
      content: content,
      reviewImgList: reviewImgList,
    });
  },
  addReviewExcludeVeganAndOnline: async (user, bakeryId, purchaseBreadList, star, content, reviewImgList) => {
    let t = await sequelize.transaction();
    try{
      const review = await Review.create(
        {
          UserId: user.id,
            BakeryId: bakeryId,
            purchaseBreadList: purchaseBreadList,
            star: star,
            content: content,
            reviewImgList: reviewImgList,
            isVegan: false,
            isOnline: false
        },
        t,
      );

      await VisitBakery.findOrCreate({
        where: { [Op.and]: [{ UserId: user.id }, { BakeryId: bakeryId }] },
        defaults: {
          UserId: user.id,
          BakeryId: bakeryId,
        },
        t
      });

      await User.update(
        {
          reward : user.reward+500
        },
        {
          where: { id: user.id }
        },
        t
      )
      
      await RewardHistory.create({
        UserId : user.id, reward : 500, acquisitionMethod: "리뷰 작성"})

      await t.commit();

      return review
    } catch(err){
      await t.rollback();
    }
  },
  updateReview: async (
    reviewId,
    user,
    bakeryId,
    isOnline,
    isVegan,
    purchaseBreadList,
    star,
    content,
    reviewImgList,
  ) => {
    await Review.update(
      {
        UserId: user.id,
        BakeryId: bakeryId,
        isVegan: isVegan,
        isOnline: isOnline,
        purchaseBreadList: purchaseBreadList,
        star: star,
        content: content,
        reviewImgList: reviewImgList,
      },
      {
        where: { id: reviewId },
      },
    );
  },
  updateReviewExcludeVeganAndOnline: async (reviewId, user, purchaseBreadList, star, content, reviewImgList) => {
    // eslint-disable-next-line no-return-await
    return await sequelize.transaction(async transaction => {
      return await Review.findOne({
        where: {
          id: reviewId,
        },
      }).then(result => {
        return Review.update(
          {
            UserId: user.id,
            purchaseBreadList,
            star,
            content,
            reviewImgList,
          },
          {
            where: { id: reviewId },
          },
          { transaction },
        ).then(() => {
          return result;
        });
      });
    });
  },
  isMyReview: async (review, myReviewList) => {
    const isMyReview = myReviewList => myReviewList.id === review.id;
    return myReviewList.some(isMyReview);
  },
  isSavedReview: async (review, savedReviewList) => {
    const isContainReview = savedReviewList => savedReviewList.ReviewId === review.id;
    return savedReviewList.some(isContainReview);
  },
  isLikedReview: async (review, likedReviewList) => {
    const isContainReview = likedReviewList => likedReviewList.ReviewId === review.id;
    return likedReviewList.some(isContainReview);
  },
  savedReview: async (userId, reviewId) => {
    await SaveReview.findOrCreate({
      where: {
        UserId: userId,
        ReviewId: reviewId,
      },
    });
  },
  likedReview: async (userId, reviewId) => {
    await LikeReview.create({ UserId: userId, ReviewId: reviewId });
  },
  deleteLikedReview: async (userId, reviewId) => {
    await LikeReview.destroy({
      where: {
        UserId: userId,
        ReviewId: reviewId,
      },
    });
  },
  deleteSavedReview: async (userId, reviewId) => {
    await SaveReview.destroy({
      where: {
        UserId: userId,
        ReviewId: reviewId,
      },
    });
  },
  deleteMyReview: async (userId, reviewId) => {
    return Review.findOne({
      where: {
        UserId: userId,
        id: reviewId,
      },
    }).then(result => {
      return Review.destroy({
        where: {
          UserId: userId,
          id: reviewId,
        },
      }).then(() => {
        return result;
      });
    });
  },
  findLikeReviewCount: async reviewId => {
    const result = await LikeReview.findAndCountAll({
      raw: true,
      where: {
        ReviewId: reviewId,
      },
    });
    return { count: result.count, review: result.rows[0] };
  },
  findLikeReview: async () => {
    return await LikeReview.findAll({});
  },
  getCount: (id, countList) => {
    return countList.filter(count => count === id).length;
  },
  // 추천순으로 정렬
  getSortByLikeCount: list => {
    list.sort(function (a, b) {
      return b.likeReviewCount - a.likeReviewCount;
    });
  },
  // 저장한 후기 전체 개수
  getSavedReview: async user => {
    return await SaveReview.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 저장한 후기 빵집별 개수
  getSavedReviewOfBakery: async (user, bakeryId) => {
    return await User.findAndCountAll({
      where: {
        id: user.id,
      },
      include: [
        {
          model: Review,
          as: 'SavedReview',
          where: { BakeryId: bakeryId },
          attributes: {},
        },
      ],
    });
  },
  // 내가 쓴 후기 개수
  getMyReview: async user => {
    return await Review.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 방문한 빵집 체크
  checkVisitBakery: async (user, bakeryId) => {
    // 이미 체크했는지 확인 & 없으면 생성
    return await VisitBakery.findOrCreate({
      where: { [Op.and]: [{ UserId: user.id }, { BakeryId: bakeryId }] },
      defaults: {
        UserId: user.id,
        BakeryId: bakeryId,
      },
    });
  },
  findReviewByBakeryList: async bakeryList => {
    return Promise.all(
      bakeryList.map(async bakery => {
        let reviewList = await Review.findAll({ where: { BakeryId: bakery.id } });
        bakery.star = await getBakeryStar(reviewList);
        return bakery;
      }),
    );
  },
  getBakeryStar: reviewList => {
    return getBakeryStar(reviewList);
  },
  getBakeryStarOfBakeryList: async bakeryList => {
    return bakeryList.map(bakery => {
      bakery.star = getBakeryStar(bakery.Reviews);
      //console.log(bakery);
      return bakery;
    });
  },
  findUsersReviewList: async userId => {
    return Review.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Bakery,
        },
      ],
    });
  },
  deleteReviewImages: imageUrls => {
    if (imageUrls != null && imageUrls.length !== 0) reviewDelete(imageUrls);
  },
  findReviewByPurchaseBread: async breadName => {
    return Review.findAll({
      where: {
        purchaseBreadList: { [Op.like]: `%${breadName}%` },
      },
      include: [
        {
          model: Bakery,
        },
        {
          model: User,
          attributes: ['nickName', 'profileImg'],
        },
      ],
    });
  },
};

const getBakeryStar = reviewList => {
  const starList = reviewList.map(review => review.star);
  const result = starList.reduce((sum, currValue) => {
    return sum + currValue;
  }, 0);

  return isNaN(result / reviewList.length) ? null : parseFloat(result / reviewList.length);
};
