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
      accessToken: {
        type: DataTypes.STRING(500),
        unique: 'accessToken',
        allowNull: true,
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
        define: 'https://bbang-map.s3.ap-northeast-2.amazonaws.com/images/user/default/profile_empty.png',
      },
      backgroundImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        define: 'https://bbang-map.s3.ap-northeast-2.amazonaws.com/images/user/default/dark_mask_xxl_empty.png',
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
      isCertificated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('now()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('now()'),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
