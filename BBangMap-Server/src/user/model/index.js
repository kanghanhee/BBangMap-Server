module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      //닉네임
      nickName: {
        type: DataTypes.STRING(30),
        unique: "nickName",
        allowNull: false,
      },

      uuid: {
        type: DataTypes.STRING(50),
        unique: "uuid",
        allowNull: false,
      },
      //프로필이미지
      profileImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        define:
          "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
      },
      backgroundImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        define:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
      //역할(1=admin,2=user)
      role: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      //방문한 빵집 리스트
      //inviteBakeryList: {
      //type: DataTypes.STRING,
      //set: function (val) {
      // return this.setDataValue("inviteBakeryList", JSON.stringify(val));
      //     },
      //등급
      rank: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      // //보관한 빵집 리스트
      // saveBakeryList: {
      //     type: DataTypes.STRING,
      //     set: function (val) {
      //         return this.setDataValue('saveBakeryList', JSON.stringify(val));
      //     },
      //     get: function () {
      //         return JSON.parse(this.getDataValue('saveBakeryList'));
      //     }
      // },
      // //방문한 빵집 리스트
      // inviteBakeryList: {
      //     type: DataTypes.STRING,
      //     set: function (val) {
      //         return this.setDataValue('inviteBakeryList', JSON.stringify(val));
      //     },
      //     get: function () {
      //         return JSON.parse(this.getDataValue('inviteBakeryList'));
      //     }
      // }
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
