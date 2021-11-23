const checkSucceededMissionDto = (bakery, isSucceeded, isChangedRank, rank, mission) => {
  //isMissionBakery, isSucceeded, isChangeRank, rank, user
  return {
    rank: rank.rank,
    isMissionBakery: bakery,
    isSuccessMission: isSucceeded,
    isChangedRank: isChangedRank,
    badgeName: mission.badgeName,
    badgeImg: mission.badgeImg
  };
};
module.exports = checkSucceededMissionDto;