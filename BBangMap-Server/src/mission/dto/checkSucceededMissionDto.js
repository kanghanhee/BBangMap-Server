const checkSucceededMissionDto = (bakery, isSucceeded, isChangedRank, beforeRank, afterRank, mission) => {
  return {
    isMissionBakery: bakery,
    isSucceededMission: isSucceeded,
    isChangedRank,
    beforeRank,
    afterRank: afterRank.rank,
    badgeName: mission.badgeName,
    badgeImg: mission.badgeImg,
  };
};
module.exports = checkSucceededMissionDto;
