const userSucceededMissionDto = (mission, isVisitedList) => {
  return {
    missionId: mission.id,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionBadgeImg: mission.badgeImg,
    missionAchievedBakeryList: isVisitedList,
  };
};
module.exports = userSucceededMissionDto;
