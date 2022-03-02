module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'LikeCuration',
        {
            CurationId:{
                type : DataTypes.INTEGER,
                references: {
                    model: 'Curation',
                    key: 'id'
                }
            },
            UserId:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id'
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
};