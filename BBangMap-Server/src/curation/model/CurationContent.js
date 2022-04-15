module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'CurationContent',
    {
      contentsTitle: {
        type: DataTypes.STRING,
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
