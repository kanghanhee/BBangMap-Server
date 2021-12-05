const createMissionBakeryDto = (mission, bakeryId) => {
  return {
    BakeryId: bakeryId,
    MissionId: mission.id,
  };
};
module.exports = createMissionBakeryDto;
