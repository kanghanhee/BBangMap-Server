module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'RequestedBakery',
    {
      placeId: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      bakeryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      reason:{
        type: DataTypes.STRING(1000),
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
  );
};