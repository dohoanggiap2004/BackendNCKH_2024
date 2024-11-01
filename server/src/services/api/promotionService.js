
const { Promotion } = require('../../app/models')
const getPromotionsService = async () => {
  return await Promotion.findAll();
};

const getPromotionByIdService = async (promotionId) => {
  return await Promotion.findByPk(promotionId);
};

const createPromotionService = async (promotion) => {
  return await Promotion.create(promotion);
};
const updatePromotionService = async (promotion) => {
    const { promotionId, ...updateFields } = promotion; 

    return await Promotion.update(updateFields, {
      where: {
        promotionId: promotionId 
      }
    });
};

const deletePromotionService = async (promotionId) => {
  return await Promotion.destroy({
    where: {
        promotionId: promotionId
    }
  });
};

module.exports = { getPromotionsService, getPromotionByIdService, createPromotionService, updatePromotionService, deletePromotionService, };
