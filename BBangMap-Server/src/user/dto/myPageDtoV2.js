const myPageDto = (user, reward, reviewCount) => {
    return {
      profileImg: user.profileImg,
      nickname: user.nickName,
      point: user.reward,
      reward: reward,
      backgroundImg: user.backgroundImg,
      myReviewCount: reviewCount
    };
  };
  
  module.exports = myPageDto;
  