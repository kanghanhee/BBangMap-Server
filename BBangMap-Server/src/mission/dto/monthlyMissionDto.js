const monthlyMissionDto = mission => {
  return {
    missionId: mission.id,
    missionTitle: mission.missionTitle,
    missionContent: mission.missionContent,
    missionActiveStampImg: mission.missionActiveStampImg,
    missionInactiveStampImg: mission.missionInactiveStampImg,
  };
};
module.exports = monthlyMissionDto;
