const requestedBakeryDto = bakery => {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `요청번호: ${bakery.id}\n>빵집이름: ${bakery.bakeryName}\n>주소: ${bakery.address}\n>요청_사유: ${bakery.reason}\n>유저_아이디: ${bakery.UserId}`,
    },
  };
};
module.exports = requestedBakeryDto;
