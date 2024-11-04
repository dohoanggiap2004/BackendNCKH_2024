const {
    getProductsService,
    getProductByIdService,
    getProductsByCategoryIdService,
    createProductService,
    updateProductService,
    deleteProductService,
    countAllProductsService,
  } = require("../../../services/api/productService");
  class ProductController {
    async getProducts(req, res) {
      try {
        if(!req?.query.page || !req?.query.limit){
          return res.status(400).json({message: 'page and limit are required'});
        }
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const products = await getProductsService(limit, offset);
        const totalProducts = await countAllProductsService();
        const totalPage = Math.ceil(totalProducts / limit)
        if (!products) {
          return res.status(200).json({ message: "products not found" });
        }
  
        res.status(200).json({
          totalProducts: totalProducts,
          totalPage: totalPage,
          currentPage: page,
          data: products,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getProductById(req, res) {
      try {
        if (!req?.params?.productId)
          return res.status(400).json({ message: "Product id is required" });
  
        const productId = req.params.productId;
        const product = await getProductByIdService(productId);
  
        if (!product) {
          return res.status(200).json({ message: "Product not found" });
        }
  
        res.status(200).json({
          data: product,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

    async getProductsByCategoryId(req, res) {
        try {
          if (!req?.params?.categoryId)
            return res.status(400).json({ message: "Product id is required" });
    
          const categoryId = req.params.categoryId;
          const products = await getProductsByCategoryIdService(categoryId);
    
          if (!products) {
            return res.status(200).json({ message: "Product not found" });
          }
    
          res.status(200).json({
            data: products,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }

    async createProduct(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Product information is required" });
  
        const product = req.body;
        const newProduct = await createProductService(product);
  
        res.status(201).json({
            newProduct: newProduct,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateProduct(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Product information is required" });
  
        const product = req.body;
        const [result] = await updateProductService(product);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No product changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteProduct(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Product information is required" });
  
        const productId = req.body.productId;
        const result = await deleteProductService(productId);
        if (result === 0) return res.status(200).json({ message: "No product be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new ProductController();
