module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'MissionWhether',
    {
      missionAchieveCount: {
        type: DataTypes.INTEGER,
        define: 0,
      },
      missionSuccessWhether: {
        type: DataTypes.BOOLEAN,
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
