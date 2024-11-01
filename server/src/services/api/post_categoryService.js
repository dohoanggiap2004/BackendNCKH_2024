
const { Post_Category } = require('../../app/models')

const getPost_CategoriesService = async () => {
  return await Post_Category.findAll();
};

const createPost_CategoryService = async (post_category) => {
  return await Post_Category.create(post_category);
};

const updatePost_CategoryService = async (post_category) => {
    const { postCategoryId, ...updateFields } = post_category; 

    return await Post_Category.update(updateFields, {
      where: {
        postCategoryId: postCategoryId 
      }
    });
};

const deletePost_CategoryService = async (postCategoryId) => {
  return await Post_Category.destroy({
    where: {
      postCategoryId: postCategoryId
    }
  });
};

module.exports = { getPost_CategoriesService, createPost_CategoryService, updatePost_CategoryService, deletePost_CategoryService, };
