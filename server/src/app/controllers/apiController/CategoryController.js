const {
    getCategoriesService, 
    getCategoryByIdService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService
  } = require("../../../services/api/categoryService");
  class CategoryController {
    async getCategories(req, res) {
      try {
        const categories = await getCategoriesService();
  
        if (!categories) {
          return res.status(200).json({ message: "Category not found" });
        }
  
        res.status(200).json({
          data: categories,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getCategoryById(req, res) {
      try {
        if (!req?.params?.categoryId)
          return res.status(400).json({ message: "Category id is required" });
  
        const categoryId = req.params.categoryId;
        const category = await getCategoryByIdService(categoryId);
  
        if (!category) {
          return res.status(200).json({ message: "Category not found" });
        }
  
        res.status(200).json({
          data: category,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createCategory(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Category information is required" });
  
        const category = req.body;
        const newCategory = await createCategoryService(category);
  
        res.status(201).json({
            newCategory: newCategory,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateCategory(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Category information is required" });
  
        const category = req.body;
        const [result] = await updateCategoryService(category);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No category changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteCategory(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Category information is required" });
  
        const categoryId = req.body.categoryId;
        const result = await deleteCategoryService(categoryId);
        if (result === 0) return res.status(200).json({ message: "No category be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new CategoryController();
  