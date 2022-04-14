module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'CurationTarget',
    {
      CurationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Curation',
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
