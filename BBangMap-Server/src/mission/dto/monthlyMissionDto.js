const monthlyMissionDto = (mission, missionBakery) => {
  return {
    missionId: mission.id,
    missionTitle: mission.missionTitle,
    missionContent: missionContent,
    missionBadgeImg: mission.missionBadgeImg,
    missionBakeryList: missionBakery,
  };
};
module.exports = monthlyMissionDto;
