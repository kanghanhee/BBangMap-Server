module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Curation',
    {
      mainTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subTitle: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      curatorComment: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      curationImage: {
        type: DataTypes.STRING(1000),
        allowNull: false,
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
