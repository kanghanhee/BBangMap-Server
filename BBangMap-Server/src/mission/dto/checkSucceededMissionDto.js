const checkSucceededMissionDto = (bakery, isSucceeded, isChangedRank, beforeRank, afterRank, mission, reviewId) => {
  return {
    isMissionBakery: bakery,
    isSucceededMission: isSucceeded,
    isChangedRank,
    beforeRank,
    afterRank: afterRank.rank,
    badgeName: mission.badgeName,
    badgeImg: mission.badgeImg,
    reviewId,
  };
};
module.exports = checkSucceededMissionDto;
