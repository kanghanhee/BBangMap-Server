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
      seasonMenu: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isDrink: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isVegan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
  );
};
