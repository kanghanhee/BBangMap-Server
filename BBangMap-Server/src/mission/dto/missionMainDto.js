const missionMainDto = (mission, visitedBakeryList, badgeList) => {
  return {
    missionId: mission.missionId,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionAchieveCount: visitedBakeryList.length,
    missionBadgeImg: mission.missionBadgeImg,
    missionBakeryList: mission.missionBakery,
    missionBadgeList: badgeList,
  };
};
module.exports = missionMainDto;
