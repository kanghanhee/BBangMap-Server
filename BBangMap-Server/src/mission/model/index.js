module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Mission',{
        missionTitle:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        missionContent:{
            type:DataTypes.STRING(1000),
            allowNull: false
        },
        missionDate:{
            type:DataTypes.DATE,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: true
    })
}