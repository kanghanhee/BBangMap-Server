module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'MissionBakery',
    {
      MissionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Mission',
          key: 'id',
        },
      },
      BakeryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bakery',
          key: 'id',
        },
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
