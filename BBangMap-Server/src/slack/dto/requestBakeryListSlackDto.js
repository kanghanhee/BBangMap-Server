const requestBakerySlackDto = require('./requestBakerySlackDto');

const requestedBakeryListDto = bakeryList => {
  const blocks = [];
  blocks.push({
    type: 'section',
    text: {
      type: 'plain_text',
      text: `🥐요청된 빵집 목록🥯 ${
        bakeryList.length
      }개를 불러옵니다. ${new Date().getHours()}시 ${new Date().getMinutes()}분 기준`,
      emoji: true,
    },
  });
  bakeryList.map(bakery => blocks.push(requestBakerySlackDto(bakery)));
  return {
    blocks,
  };
};
module.exports = requestedBakeryListDto;
