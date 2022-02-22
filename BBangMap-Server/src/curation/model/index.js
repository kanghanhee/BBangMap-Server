module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Curation',
        {
            mainTitle:{
                type: DataTypes.STRING,
                allowNull: false
            },
            subTitle:{
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            aWord:{
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            curationImage:{
                type: DataTypes.STRING(1000),
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
};