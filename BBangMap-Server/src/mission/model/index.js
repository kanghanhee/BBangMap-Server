module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Mission',
    {
      missionTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      missionContent: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      missionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      badgeName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      badgeImg: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      missionActiveStampImg: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      missionInactiveStampImg: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
  );
};
