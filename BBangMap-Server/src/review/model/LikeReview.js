module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'LikeReview',
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      ReviewId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Review',
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
