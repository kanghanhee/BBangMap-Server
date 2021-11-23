const { Bakery, User, Review } = require("../../../models");

module.exports = {
  findUserIncludeSavedBakery: async (user) => {
    return await User.findOne({
      where: { id: user.id },
      include: {
        model: Bakery,
        as: "SavedBakery",
        attributes: {},
      },
    });
  },
  findUserIncludeSavedReview: async (user) => {
    return await User.findOne({
      where: { id: user.id },
      include: {
        model: Review,
        as: "SavedReview",
        attributes: {},
        include: {
          model: Bakery,
          as: "Bakery",
          attributes: ["bakeryName"],
        },
      },
      group: ["SavedReview.BakeryId"],
    });
  },
  findUserIncludeSavedReviewOfBakery: async (bakeryId, user) => {
    return await User.findOne({
      where: { id: user.id },
      include: [
        {
          model: Review,
          as: "SavedReview",
          where: { BakeryId: bakeryId },
          attributes: {},
          include: {
            model: Bakery,
            as: "Bakery",
            attributes: ["bakeryName"],
          },
        },
      ],
    });
  },
};
