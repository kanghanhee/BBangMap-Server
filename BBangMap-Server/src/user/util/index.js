const { User } = require("../../../models");
const { Op } = require("sequelize");
const { is } = require("sequelize/types/lib/operators");
const { userRank } = require("../../mission/controller");
const { adjective, second, bread } = require("../data");
const path = require("path");
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
      profileImg:
        "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
      backgroundImg:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    });
  },
  //랜덤 닉네임
  randomNickname: async () => {
    const path = require("path");
    const fs = require("fs");

    const readFile = (fileName) => {
      return new Promise((resolve, reject) => {
        fs.readFile(fileName + ".txt", "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    };
    const rand = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomNickname = async () => {
      const firstContents = await readFile("./data/adj");
      //   console.log(firstContents);
      let firstWordList = firstContents.split("\n").slice(0, -1);
      //   console.log(firstWordList[0]);
      const first = firstWordList[rand(0, firstWordList.length - 1)];
      console.log(first);
    };

    randomNickname();
  },
};
