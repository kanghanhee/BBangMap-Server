module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MissionWhether', {
        missionCount:{
            type:DataTypes.INTEGER,
            allowNull : false
        },
        missionSuccessWhether:{
            type:DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: true
    })
}