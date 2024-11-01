const {
    getPostsService,
    getPostByIdService,
    getPostsByPCIdService,
    createPostService, 
    updatePostService,
    deletePostService
  } = require("../../../services/api/postService");
  class PostController {
    async getPosts(req, res) {
      try {
        const posts = await getPostsService();
  
        if (!posts) {
          return res.status(200).json({ message: "post not found" });
        }
  
        res.status(200).json({
          data: posts,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getPostById(req, res) {
      try {
        if (!req?.params?.postId)
          return res.status(400).json({ message: "Post id is required" });
  
        const postId = req.params.postId;
        const post = await getPostByIdService(postId);
  
        if (!post) {
          return res.status(200).json({ message: "Post not found" });
        }
  
        res.status(200).json({
          data: post,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

    async getPostsByPCId(req, res) {
        try {
          if (!req?.params?.postCategoryId)
            return res.status(400).json({ message: "Post category id is required" });
    
          const postCategoryId = req.params.postCategoryId;
          const posts = await getPostsByPCIdService(postCategoryId);
    
          if (!posts) {
            return res.status(200).json({ message: "Post not found" });
          }
    
          res.status(200).json({
            data: posts,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
  
    async createPost(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Post information is required" });
  
        const post = req.body;
        console.log(post)
        const newPost = await createPostService(post);
  
        res.status(201).json({
            newPost: newPost,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updatePost(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Post information is required" });
  
        const post = req.body;
        const [result] = await updatePostService(post);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No post changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deletePost(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Post information is required" });
  
        const postId = req.body.postId;
        const result = await deletePostService(postId);
        if (result === 0) return res.status(200).json({ message: "No post be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new PostController();
  