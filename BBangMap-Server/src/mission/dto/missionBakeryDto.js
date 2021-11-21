const missionBakeryDto = (missionBakeryInfo, isSucceeded) => {
    return {
        missionBakeryId: missionBakeryInfo.id,
        missionBakeryName: missionBakeryInfo.bakeryName,
        isSucceeded: isSucceeded
    }
}
module.exports = missionBakeryDto;