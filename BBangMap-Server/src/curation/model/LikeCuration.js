module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'LikeCuration',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // CurationId:{
      //     type : DataTypes.INTEGER,
      //     references: {
      //         model: 'Curation',
      //         key: 'id'
      //     }
      // },
      // UserId:{
      //     type: DataTypes.INTEGER,
      //     references: {
      //         model: 'User',
      //         key: 'id'
      //     }
      // }
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
