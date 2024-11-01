
const { Color_Detail } = require('../../app/models')

const getColor_DetailsService = async () => {
  return await Color_Detail.findAll();
};

const getColor_DetailByProductIdService = async (productId) => {
  return await Color_Detail.findAll({
    where: {
        productId: productId,
    }
  });
};

const getColor_DetailByIdService = async (productId, colorId) => {
    return await Color_Detail.findAll({
      where: {
          productId: productId,
          colorId: colorId,
      }
    });
  };

const createColor_DetailService = async (color_detail) => {
  return await Color_Detail.create(color_detail);
};

const updateColor_DetailService = async (color_detail) => {
    const { productId, colorId,  ...updateFields } = color_detail; 

    return await Color_Detail.update(updateFields, {
      where: {
        productId: productId,
        colorId: colorId,
      }
    });
};

const deleteColor_DetailService = async (productId, colorId) => {
  return await Color_Detail.destroy({
    where: {
        productId: productId,
        colorId: colorId,
    }
  });
};

module.exports = { getColor_DetailsService, getColor_DetailByProductIdService, getColor_DetailByIdService, createColor_DetailService, updateColor_DetailService, deleteColor_DetailService };
