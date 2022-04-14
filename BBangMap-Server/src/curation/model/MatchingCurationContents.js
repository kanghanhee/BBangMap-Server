module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'MatchingCurationContents',
    {
      CurationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Curation',
          key: 'id',
        },
      },
      CurationContentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CurationContents',
          key: 'id',
        },
      },
      priority: {
        type: DataTypes.INTEGER,
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
