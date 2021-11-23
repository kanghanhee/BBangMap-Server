const missionMainDto = (mission, bakery, badgeList, missionAchieveCount) => {
  return {
    missionId: mission.missionId,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionAchieveCount: missionAchieveCount,
    missionActiveStampImg: mission.missionActiveStampImg,
    missionInactiveStampImg: mission.missionInactiveStampImg,
    missionBadgeImg: mission.missionBadgeImg,
    missionBakeryList: bakery,
    missionBadgeList: badgeList,
  };
};
module.exports = missionMainDto;