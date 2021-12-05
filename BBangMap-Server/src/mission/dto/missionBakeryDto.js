const missionBakeryDto = (missionBakeryInfo, isVisited) => {
  return {
    missionBakeryId: missionBakeryInfo.id,
    missionBakeryName: missionBakeryInfo.bakeryName,
    isVisited,
  };
};
module.exports = missionBakeryDto;
