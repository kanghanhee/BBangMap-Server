const requestedBakeryDto = bakery => {
  return {
    빵집이름: bakery.bakeryName,
    주소: bakery.address,
    요청_사유: bakery.reason,
    유저_아이디: bakery.UserId,
  };
};
module.exports = requestedBakeryDto;
