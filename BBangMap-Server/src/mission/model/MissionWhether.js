module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MissionWhether', {
        missionAchieveCount: {
            type: DataTypes.INTEGER,
            define: 0,
        },
        missionSuccessWhether: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })
}