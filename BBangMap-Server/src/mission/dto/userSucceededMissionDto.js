const userSucceededMissionDto = (mission, bakeryList) => {
  return {
    missionId: mission.id,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionBadgeImg: mission.missionBadgeImg,
    missionAchievedBakeryList: bakeryList,
  };
};
module.exports = userSucceededMissionDto;
