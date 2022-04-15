/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const dayjs = require('dayjs');
const fs = require('fs');
const { sequelize } = require('../../../models');
const { User, Review, SaveBakery, SaveReview } = require('../../../models');
const { defaultBgImg, defaultProfileImg } = require('../../../modules/definition');

const now = dayjs().add(9, 'hour');

module.exports = {
  findUserById: async id => {
    return await User.findOne({
      where: {
        id,
      },
    });
  },
  // 회원 중복체크
  isExistUser: async uuid => {
    const existUser = await User.findOne({
      where: {
        uuid,
      },
    });
    if (!existUser) return false;
    return true;
  },
  // 닉네임 중복체크
  isExistNickname: async nickname => {
    const existNickname = await User.findOne({
      where: {
        nickName: nickname,
      },
    });
    if (!existNickname) return false;
    return true;
  },
  // 회원 등록(role:1-> admin, 2: user)
  createUser: async (identifyToken, nickname) => {
    return await User.create({
      nickName: nickname,
      identifyToken,
      grade: 1,
      role: 2,
      profileImg: defaultProfileImg,
      backgroundImg: defaultBgImg,
      createdAt: now,
      updatedAt: now,
    });
  },
  // 파일 읽기
  readWordFile: async fileName => {
    return new Promise((resolve, reject) => {
      fs.readFile(`${fileName}.txt`, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  // 랜덤 닉네임
  randomNickname: async stringWords => {
    const rand = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const pickWord = async words => {
      const wordList = words.split('\n').slice(0, -1);
      return wordList[rand(0, wordList.length - 1)];
    };
    return await pickWord(stringWords);
  },
  // db프로필 수정
  saveUpdateUser: async updateUser => {
    await User.update(
      {
        nickName: updateUser.nickname,
        profileImg: updateUser.profileImg,
        backgroundImg: updateUser.backgroundImg,
        updatedAt: now,
      },
      {
        where: {
          id: updateUser.id,
        },
      },
    );
  },

  // db set null 삭제
  reviewSetNull: async user => {
    const query = `UPDATE Review SET UserId = null WHERE UserId= :userId`;
    await sequelize.query(query, {
      replacements: {
        userId: user.id,
      },
      type: sequelize.QueryTypes.UPDATE,
      raw: true,
    });
  },
  // db cascade 삭제(not in review)
  deleteCascade: async user => {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
  },

  // 내가쓴후기개수
  getMyReview: async user => {
    return await Review.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 빵집 보관함 개수
  getSavedBakery: async user => {
    return await SaveBakery.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 리뷰 보관함 개수
  getSavedReview: async user => {
    return await SaveReview.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  //uuid를 token으로 수정하고 uuid를 header에 넣는 로직을 전부 token으로 변경해야할거같은데..
  findUserByIdentifyToken: async authIdentifyToken => {
    return await User.findOne({
      where: { identifyToken: authIdentifyToken },
    });
  },
  setUserToken: async (user, accessToken) => {
    await User.update(
      {
        accessToken: accessToken,
        updatedAt: now,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
  },
  findUserByDecodedId: async id => {
    return await User.findOne({
      where: { id },
    });
  },
};
