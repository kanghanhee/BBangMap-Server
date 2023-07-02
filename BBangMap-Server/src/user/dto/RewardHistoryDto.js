const RewardHistoryDto = (history) => {
    return {
        acquisitionMethod: history.acquisitionMethod,
        reward: history.reward,
        createdAt: history.createdAt
    };
  };
  
  module.exports = RewardHistoryDto;
  