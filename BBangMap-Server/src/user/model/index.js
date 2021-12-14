module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      // 닉네임
      nickName: {
        type: DataTypes.STRING(30),
        unique: 'nickName',
        allowNull: false,
      },
        accessToken:{
          type: DataTypes.STRING(500),
            unique:'accessToken'
        },
        refreshToken:{
          type: DataTypes.STRING(500),
            unique:'refreshToken'
        },
      identifyToken: {
        type: DataTypes.STRING(50),
        unique: 'identifyToken',
        allowNull: false,
      },
      // 프로필이미지
      profileImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        define: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      },
      backgroundImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        define: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      },
      // 역할(1=admin,2=user)
      role: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      // 등급
      grade: {
        type: DataTypes.INTEGER,
        define: 0,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
  );
};
