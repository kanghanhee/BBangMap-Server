module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Bakery', {
        bakeryName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        openTime: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        offDay: {
            type: DataTypes.STRING,
            set: function (val) {
                return this.setDataValue('offDay', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('offDay'));
            }
        },
        waiting: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        weatherMenu: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        drink: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        vegan: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        soldOut: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bestMenu: {
            type: DataTypes.STRING,
            set: function (val) {
                return this.setDataValue('bestMenu', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('bestMenu'));
            }
        },
        totalMenu: {
            type: DataTypes.STRING,
            set: function (val) {
                return this.setDataValue('totalMenu', JSON.stringify(val));
            },
            get: function () {
                return JSON.parse(this.getDataValue('totalMenu'));
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })
}