
const { Color } = require('../../app/models')
const getColorsService = async () => {
  return await Color.findAll();
};

const getColorByIdService = async (colorId) => {
  return await Color.findByPk(colorId);
};

const createColorService = async (color) => {
  return await Color.create(color);
};
const updateColorService = async (color) => {
    const { colorId, ...updateFields } = color; 

    return await Color.update(updateFields, {
      where: {
        colorId: colorId,
      }
    });
};

const deleteColorService = async (colorId) => {
  return await Color.destroy({
    where: {
        colorId: colorId
    }
  });
};

module.exports = { getColorsService, getColorByIdService, createColorService, updateColorService, deleteColorService, };
