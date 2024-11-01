
const { Category } = require('../../app/models')
const getCategoriesService = async () => {
  return await Category.findAll({
    where: {
      parentCategoryId: null // Lọc chỉ lấy danh mục cha
    },
    include: [
      {
        model: Category,
        as: 'children' // Mảng danh mục con
      }
    ]
  });
};

const getCategoryByIdService = async (categoryId) => {
  return await Category.findByPk(categoryId);
};

const createCategoryService = async (category) => {
  return await Category.create(category);
};
const updateCategoryService = async (category) => {
    const { categoryId, ...updateFields } = category; 

    return await Category.update(updateFields, {
      where: {
        categoryId: categoryId 
      }
    });
};

const deleteCategoryService = async (categoryId) => {
  return await Category.destroy({
    where: {
        categoryId: categoryId
    }
  });
};

module.exports = { getCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService, };
