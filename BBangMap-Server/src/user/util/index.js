const { User } = require("../../../models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const readFile = require("util").promisify(fs.readFile);

module.exports = {
  //회원 중복체크
  isExistUser: async (uuid) => {
    const existUser = await User.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!existUser) return false;
    return true;
  },
  //닉네임 중복체크
  isExistNickname: async (nickname) => {
    const existNickname = await User.findOne({
      where: {
        nickName: nickname,
      },
    });
    if (!existNickname) return false;
    return true;
  },
  //회원 등록(role:1-> admin, 2: user)
  createUser: async (uuid, nickname) => {
    const newUser = User.create({
      nickName: nickname,
      uuid: uuid,
      rank: 1,
      role: 2,
    });
  },
  //파일 읽기
  readWordFile: async (fileName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName + ".txt", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  //랜덤 닉네임
  randomNickname: async (stringWords) => {
    (rand = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }),
      (pickWord = async (stringWords) => {
        let wordList = stringWords.split("\r\n").slice(0, -1);
        const word = wordList[rand(0, wordList.length - 1)];
        return word;
      });
    return await pickWord(stringWords);
  },
  //db프로필 수정
  saveUpdateUser: async (updateUser) => {
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
      }
    );
  },
  //db cascade 삭제
  deleteCascade: async (user) => {},
  //db set null 삭제
  deleteSetNull: async (user) => {},
};
