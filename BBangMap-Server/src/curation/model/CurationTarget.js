module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'CurationTarget',
        {
            CurationId:{
                type : DataTypes.INTEGER,
                references: {
                    model: 'Curation',
                    key: 'id'
                }
            },
            ReviewId:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'Review',
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