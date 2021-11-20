const myPageDto = (user, reviewCount, savedBakeryCount, savedReviewCount) => {
  return {
    profileImg: user.profileImg,
    nickname: user.nickName,
    rank: user.grade,
    backgroundImg: user.backgroundImg,
    myReviewCount: reviewCount,
    savedBakeryCount: savedBakeryCount,
    savedReviewCount: savedReviewCount,
  };
};

module.exports = myPageDto;
