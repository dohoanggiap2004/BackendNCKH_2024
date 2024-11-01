const {
    getPost_CategoriesService,
    createPost_CategoryService,
    updatePost_CategoryService,
    deletePost_CategoryService
  } = require("../../../services/api/post_categoryService");
  class PostCategoryController {
    async getPostCategories(req, res) {
      try {
        const post_categories = await getPost_CategoriesService();
  
        if (!post_categories) {
          return res.status(200).json({ message: "post_categories not found" });
        }
  
        res.status(200).json({
          data: post_categories,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createPostCategory(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Post category information is required" });
  
        const post_category = req.body;
        const newPostCategory = await createPost_CategoryService(post_category);
  
        res.status(201).json({
            newPostCategory: newPostCategory,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updatePostCategory(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Post category information is required" });
  
        const post_category = req.body;
        const [result] = await updatePost_CategoryService(post_category);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No post category changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deletePostCategory(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Post category information is required" });
  
        const postCategoryId = req.body.postCategoryId;
        const result = await deletePost_CategoryService(postCategoryId);
        if (result === 0) return res.status(200).json({ message: "No post category be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new PostCategoryController();
  