/* eslint-disable no-return-await */
const fs = require('fs');
const { User, Review, SaveBakery, SaveReview } = require('../../../models');

module.exports = {
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
  createUser: async (uuid, nickname) => {
    await User.create({
      nickName: nickname,
      uuid,
      grade: 1,
      role: 2,
      profileImg: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427__340.jpg',
      backgroundImg: 'https://www.stockvault.net/data/2019/08/24/268592/preview16.jpg',
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
      const word = wordList[rand(0, wordList.length - 1)];
      return word;
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
    Review.update(
      {
        UserId: null,
      },
      {
        where: {
          UserId: user.id,
        },
      },
    );
  },
  // db cascade 삭제(not in review)
  deleteCascade: async user => {},

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
};
