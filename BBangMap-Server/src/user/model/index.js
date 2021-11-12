module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      //닉네임
      nickName: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      //역할(1=admin, 2=user)
      role: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      //프로필 이미지
      profileImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      //프로필 배경 이미지
      backgroundImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      //등급
      rank: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      //보관한 빵집 리스트
      saveBakeryList: {
        type: DataTypes.STRING,
        set: function (val) {
          return this.setDataValue("saveBakeryList", JSON.stringify(val));
        },
        get: function () {
          return JSON.parse(this.getDataValue("saveBakeryList"));
        },
      },
      //방문한 빵집 리스트
      inviteBakeryList: {
        type: DataTypes.STRING,
        set: function (val) {
          return this.setDataValue("inviteBakeryList", JSON.stringify(val));
        },
        get: function () {
          return JSON.parse(this.getDataValue("inviteBakeryList"));
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
