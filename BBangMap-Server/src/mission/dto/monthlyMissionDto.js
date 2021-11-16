const monthlyMissionDto = (mission) => {
  return {
    missionId: mission.id,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionBadgeImg: mission.badgeImg,
  };
};
module.exports = monthlyMissionDto;