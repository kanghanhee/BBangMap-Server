const myPageDto = (user, grade, reviewCount, savedBakeryCount, savedReviewCount) => {
  return {
    profileImg: user.profileImg,
    nickname: user.nickName,
    rank: grade,
    backgroundImg: user.backgroundImg,
    myReviewCount: reviewCount,
    savedBakeryCount,
    savedReviewCount,
  };
};

module.exports = myPageDto;
