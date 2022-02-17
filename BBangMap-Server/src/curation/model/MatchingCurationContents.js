module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'MatchingCurationContents',
        {
            CurationId:{
                type : DataTypes.INTEGER,
                references: {
                    model: 'Curation',
                    key: 'id'
                }
            },
            CurationContentId:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'CurationContents',
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