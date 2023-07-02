//reward는 마이페이지 개편버전에서만 제공하는 파라미터
const myPageDto = (user, grade, reviewCount, savedBakeryCount, savedReviewCount, reward, isUniqueAttendence) => {
  return {
    profileImg: user.profileImg,
    nickname: user.nickName,
    rank: grade,  //v1
    backgroundImg: reward == null ? user.backgroundImg : null,  //v1
    myReviewCount: reviewCount,
    savedBakeryCount, //v1
    savedReviewCount, //v1
    point: reward == null ? null : user.reward, //v2
    reward: reward,  //v2
    isUniqueAttendence: isUniqueAttendence //v2
  };
};

module.exports = myPageDto;
