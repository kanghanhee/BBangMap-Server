const checkSucceededMissionDto = (bakery, isSucceeded, isChangedRank, rank, mission) => {
  return {
    rank: rank.rank,
    isMissionBakery: bakery,
    isSucceededMission: isSucceeded,
    isChangedRank,
    badgeName: mission.badgeName,
    badgeImg: mission.badgeImg,
  };
};
module.exports = checkSucceededMissionDto;
