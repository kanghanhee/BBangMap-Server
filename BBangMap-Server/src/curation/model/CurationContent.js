module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'CurationContent',
        {
            contentsTitle:{
                type : DataTypes.STRING,
                allowNull : false
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
};