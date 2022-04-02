const missionMainDto = (mission, bakery, badgeList, missionAchieveCount) => {
  return {
    missionId: mission.missionId,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionAchieveCount,
    missionActiveStampImg: mission.missionActiveStampImg,
    missionInactiveStampImg: mission.missionInactiveStampImg,
    missionBakeryList: bakery,
    missionBadgeList: badgeList,
  };
};
module.exports = missionMainDto;
