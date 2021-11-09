const { User } = require("../../../models");
const { Op } = require("sequelize");
const { is } = require("sequelize/types/lib/operators");
const { userRank } = require("../../mission/controller");

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
    nickName: nickname;
    uuid: uuid;
    rank: 1;
    role: 2;
  },
};
