module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
        purchaseBreadList: {
            type: DataTypes.STRING,
            set: function (val) {
                return this.setDataValue('purchaseBreadList', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('purchaseBreadList'));
            }
        },
        isVegan: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        reviewImgList: {
            type: DataTypes.STRING(1000),
            set: function (val) {
                return this.setDataValue('reviewImg', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('reviewImg'));
            }
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        star: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        //추천수 추가
    }, {
        freezeTableName: true,
        timestamps: true
    })
}
