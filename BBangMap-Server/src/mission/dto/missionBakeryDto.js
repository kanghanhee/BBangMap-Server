const missionBakeryDto = (missionBakeryInfo, isVisited) => {
    return {
        missionBakeryId: missionBakeryInfo.id,
        missionBakeryName: missionBakeryInfo.bakeryName,
        isVisited: isVisited
    }
}
module.exports = missionBakeryDto;