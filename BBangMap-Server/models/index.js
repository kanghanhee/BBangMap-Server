const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('../src/user/model')(sequelize, Sequelize);
db.Bakery = require('../src/bakery/model')(sequelize, Sequelize);
db.Review = require('../src/review/model')(sequelize, Sequelize);
db.Mission = require('../src/mission/model')(sequelize, Sequelize);
db.MissionWhether = require('../src/mission/model/MissionWhether')(sequelize, Sequelize);
db.SaveBakery = require('../src/user/model/SaveBakery')(sequelize, Sequelize);
db.VisitBakery = require('../src/user/model/VisitBakery')(sequelize, Sequelize);
db.SaveReview = require('../src/user/model/SaveReview')(sequelize, Sequelize);
db.LikeReview = require('../src/review/model/LikeReview')(sequelize, Sequelize);
db.MissionBakery = require('../src/mission/model/MissionBakery')(sequelize, Sequelize);
db.Curation = require('../src/curation/model')(sequelize, Sequelize);
db.CurationTarget = require('../src/curation/model/CurationTarget')(sequelize, Sequelize);
db.LikeCuration = require('../src/curation/model/LikeCuration')(sequelize, Sequelize);
db.CurationContent = require('../src/curation/model/CurationContent')(sequelize, Sequelize);
db.MatchingCurationContents = require('../src/curation/model/MatchingCurationContents')(sequelize, Sequelize)

/* 보관한 빵집 리스트 user:bakery(1:N) */
db.User.belongsToMany(db.Bakery, { through: 'SaveBakery', as: 'SavedBakery' });
db.Bakery.belongsToMany(db.User, { through: 'SaveBakery', as: 'SaverBakery' });

/* 방문한 빵집 리스트 user:bakery(1:N) */
db.User.belongsToMany(db.Bakery, { through: 'VisitBakery', as: 'VisitedBakery',});
db.Bakery.belongsToMany(db.User, { through: 'VisitBakery', as: 'VisiterBakery',});

/* 작성한 후기 리스트 user:review(1:N) */
db.User.hasMany(db.Review, { onDelete: 'cascade' });
db.Review.belongsTo(db.User);

/* 보관한 후기 리스트 user:review(1:N) */
// db.User.hasMany(db.SaveReivew, {onDelete: 'cascade'});
// db.SaveReivew.belongsTo(db.User);
db.User.belongsToMany(db.Review, { through: 'SaveReview', as: 'SavedReview' });
db.Review.belongsToMany(db.User, { through: 'SaveReview', as: 'SaverReview' });

/* 좋아요한 후기 리스트 user:review => like (N:M) */
db.User.belongsToMany(db.Review, { through: 'LikeReview', as: 'Liked' });
db.Review.belongsToMany(db.User, { through: 'LikeReview', as: 'Liker' });

/* 후기의 빵집 review:bakery(N:1) */
db.Bakery.hasMany(db.Review, { onDelete: 'cascade' });
db.Review.belongsTo(db.Bakery);

/* 사용자와 미션여부 user:missionWhether(1:N) */
db.User.hasMany(db.MissionWhether, { onDelete: 'cascade' });
db.MissionWhether.belongsTo(db.User);

/* 미션여부와 미션 missionWhether:mission(1:1) */
db.Mission.hasOne(db.MissionWhether, { onDelete: 'cascade' });
db.MissionWhether.belongsTo(db.Mission);

/* 미션과 빵집 mission:bakery(1:N) */
// db.Mission.hasMany(db.MissionBakery, {onDelete: 'cascade'});
// db.MissionBakery.belongsTo(db.Mission);
db.Mission.belongsToMany(db.Bakery, {
  through: 'MissionBakery',
  as: 'BakeryOfMission',
});
db.Bakery.belongsToMany(db.Mission, {
  through: 'MissionBakery',
  as: 'MissionOfBakery',
});

/* 큐레이션과 리뷰 curation:review(N:M)*/
db.Curation.belongsToMany(db.Review,{through: 'CurationTarget', as: 'Target'});
db.Review.belongsToMany(db.Curation,{through: 'CurationTarget', as: 'Curations'});

/* 큐레이션과 유저(좋아요) curation:user(N:M)*/
db.Curation.belongsToMany(db.User,{through: 'LikeCuration', as: 'LikerCuration'});
db.User.belongsToMany(db.Curation,{through: 'LikeCuration', as: 'LikedCuration'});

/* 큐레이션과 유저(작성자) curation:user(N:1)*/
db.User.hasMany(db.Curation);
db.Curation.belongsTo(db.User);

/* 큐레이션과 큐레이션 컨텐츠 curation:curationContents(N:M)*/
db.Curation.belongsToMany(db.CurationContent,{through: 'MatchingCurationContents', as : 'Contents'})
db.CurationContent.belongsToMany(db.Curation,{through: 'MatchingCurationContents', as : 'Curations'})

module.exports = db;
