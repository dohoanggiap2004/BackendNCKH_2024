
const { Post } = require('../../app/models')
const getPostsService = async () => {
  return await Post.findAll();
};

const getPostByIdService = async (postId) => {
  return await Post.findByPk(postId);
};

const getPostsByPCIdService = async (postCategoryId) => {
    return await Post.findAll({
        where:{
            postCategoryId: postCategoryId,
        }
    });
  };

const createPostService = async (post) => {
  return await Post.create(post);
};
const updatePostService = async (post) => {
    const { postId, ...updateFields } = post; 

    return await Post.update(updateFields, {
      where: {
        postId: postId 
      }
    });
};

const deletePostService = async (postId) => {
  return await Post.destroy({
    where: {
        postId: postId
    }
  });
};

module.exports = { getPostsService, getPostByIdService, getPostsByPCIdService, createPostService, updatePostService, deletePostService};
