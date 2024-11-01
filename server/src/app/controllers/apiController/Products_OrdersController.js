const {
    getProducts_OrdersService,
    getProducts_OrdersByIdService,
    getProducts_OrdersByOrderIdService,
    createProducts_OrdersService,
    updateProducts_OrdersService,
    deleteProducts_OrdersService
  } = require("../../../services/api/products_ordersService");
  class Product_OrderController {
    async getProducts_Orders(req, res) {
      try {
        const products_orders = await getProducts_OrdersService();
  
        if (!products_orders) {
          return res.status(200).json({ message: "products_orders not found" });
        }
  
        res.status(200).json({
          data: products_orders,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getProducts_OrdersByOrderId(req, res) {
      try {
        if (!req?.params?.orderId)
          return res.status(400).json({ message: " order Id required" });
  
        const orderId = req.params.orderId;
        const products_orders = await getProducts_OrdersByOrderIdService(orderId);
  
        if (!products_orders) {
          return res.status(200).json({ message: "product_order not found" });
        }
  
        res.status(200).json({
          data: products_orders,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

      
    async getProduct_OrderById(req, res) {
        try {
          if (!req?.params?.productId || !req?.params?.orderId)
            return res.status(400).json({ message: "Product id or order Id required" });
    
          const productId = req.params.productId;
          const orderId = req.params.orderId;
          const product_order = await getProducts_OrdersByIdService(productId, orderId);
    
          if (!product_order) {
            return res.status(200).json({ message: "product_order not found" });
          }
    
          res.status(200).json({
            data: product_order,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }

    async createProductOrder(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Product information is required" });
  
        const product_order = req.body;
        const newProductOrder = await createProducts_OrdersService(product_order);
  
        res.status(201).json({
            newProductOrder: newProductOrder,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateProductOrder(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "product_order information is required" });
  
        const product_order = req.body;
        const [result] = await updateProducts_OrdersService(product_order);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No product_order changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteProductOrder(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "product_order information is required" });
  
        const productId = req.body.productId;
        const orderId = req.body.orderId;

        const result = await deleteProducts_OrdersService(productId, orderId);
        if (result === 0) return res.status(200).json({ message: "No product_order be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new Product_OrderController();
  