module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MissionWhether', {
        missionVisitedList:{
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('missionVisitList', JSON.stringify(val));
            },
            get:function(){
                return JSON.parse(this.getDataValue('missionVisitList'));
            }
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