const { Bakery, Review } = require("../../../models");

module.exports = {
  findReviewAll: async () => {
    return Review.findAll({
      include: [
        {
          model: Bakery,
          attributes: ["id", "bakeryName"],
        },
      ],
    });
  },
};
