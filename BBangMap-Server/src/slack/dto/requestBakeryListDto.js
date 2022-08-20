const requestedBakeryDto = require('./requestBakeryDto');

const requestedBakeryListDto = bakeryList => {
  return {
    response_type: 'in_channel',
    text: '200: Success',
    attachments: bakeryList.map(bakery => requestedBakeryDto(bakery)),
  };
};
module.exports = requestedBakeryListDto;
