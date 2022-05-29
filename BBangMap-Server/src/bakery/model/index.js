module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Bakery',
        {
            bakeryName: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            openTime: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            offDay: {
                type: DataTypes.STRING(1000),
                set: function (val) {
                    return this.setDataValue('offDay', JSON.stringify(val));
                },
                get: function () {
                    return JSON.parse(this.getDataValue('offDay'));
                },
            },
            bestMenu: {
                type: DataTypes.STRING(1000),
                set: function (val) {
                    return this.setDataValue('bestMenu', JSON.stringify(val));
                },
                get: function () {
                    return JSON.parse(this.getDataValue('bestMenu'));
                },
            },
            totalMenu: {
                type: DataTypes.STRING(1000),
                set: function (val) {
                    return this.setDataValue('totalMenu', JSON.stringify(val));
                },
                get: function () {
                    return JSON.parse(this.getDataValue('totalMenu'));
                },
            },
            address: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            bakeryImg: {
                type: DataTypes.STRING(2000),
                set: function (val) {
                    return this.setDataValue('bakeryImg', JSON.stringify(val));
                },
                get: function () {
                    return JSON.parse(this.getDataValue('bakeryImg'));
                },
            },
            seasonMenu: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isDrink: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //태그 & 온라인 여부
            isOnline: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //태그 & 비건여부
            isVegan: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //태그 & 상시
            allTheTime: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //태그 & 비정기
            irregularPeriod: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //유의사항 & 주차가능
            isParkingAvailable:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //유의사항 & 어린이 출입가능 여부
            isChildAvailable:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //유의사항 & 예약가능여부
            isReservationAvailable:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            //유의사항 & 반려동물 출입 가능여부
            isPetAvailable:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            blog: {
                type: DataTypes.STRING,
                allowNull: true
            },
            instagram: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
        },
    );
};
