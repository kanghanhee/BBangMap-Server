module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Misson', {
        missionTitle: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        missionContent: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        missionDate: {
            type: DataTypes.Date,
            allowNull: false
        },
        missionBarkery: {
            type: DataTypes.STRING,
            set: function (val) {
                return this.setDataValue('missionBarkery', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('missionBarkery'));
            }
        },
        badgeImg: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: true
    })

}