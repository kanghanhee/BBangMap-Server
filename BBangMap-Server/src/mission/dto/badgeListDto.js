const badgeListDto = mission => {
  return {
    missionId: mission.id,
    missionBadgeImg: mission.badgeImg,
  };
};
module.exports = badgeListDto;
