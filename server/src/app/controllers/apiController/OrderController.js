const {
    getOrdersService,
    getOrdersByUserIdService,
    createOrderService,
    updateOrderService,
    deleteOrderService,
  } = require("../../../services/api/orderService");
  class OrderController {
    async getOrders(req, res) {
      try {
        const orders = await getOrdersService();
  
        if (!orders) {
          return res.status(200).json({ message: "orders not found" });
        }
  
        res.status(200).json({
          data: orders,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getOrdersByUserId(req, res) {
      try {
        if (!req?.params?.userId)
          return res.status(400).json({ message: "User id is required" });
  
        const userId = req.params.userId;
        const orders = await getOrdersByUserIdService(userId);
  
        if (!orders) {
          return res.status(200).json({ message: "orders not found" });
        }
  
        res.status(200).json({
          data: orders,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createOrder(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Order information is required" });
  
        const {orderInfo, productsInfo} = req.body
        console.log('check orderinfo', orderInfo)
        console.log('check productInfo', productsInfo)

        const newOrder = await createOrderService(orderInfo, productsInfo);
  
        res.status(201).json({
            newOrder: newOrder,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateOrder(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Order information is required" });
  
        const order = req.body;
        const [result] = await updateOrderService(order);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No order changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteOrder(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "order information is required" });
  
        const orderId = req.body.orderId;
        const result = await deleteOrderService(orderId);
        if (result === 0) return res.status(200).json({ message: "No order be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new OrderController();
  