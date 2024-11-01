const { Order, sequelize, Products_Orders } = require("../../app/models");
const getOrdersService = async () => {
  return await Order.findAll();
};

const getOrdersByUserIdService = async (userId) => {
  return await Order.findAll({
    where: {
      userId: userId,
    },
  });
};

const createOrderService = async (orderInfo, productsInfo) => {
  const t = await sequelize.transaction();
    try {
      const newOrder = await Order.create(orderInfo, {transaction: t})
  
      //get order id before create new order
      const products_order = productsInfo.map(product => ({
        orderId: newOrder.orderId,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      }))

      const newProductOrder = await Products_Orders.bulkCreate(products_order, {transaction: t})
      data = {
        newOrder: newOrder,
        newProductOrder: newProductOrder,
      }

      await t.commit()
      return data
    } catch (error) {
      await t.rollback()
      console.error('Error in createOrder:', error);
      // Ném lỗi lên controller hoặc trả về một object lỗi nếu cần thiết
      throw new Error('Unable to create order');
    }
};

const updateOrderService = async (order) => {
  const { orderId, ...updateFields } = order;

  return await Order.update(updateFields, {
    where: {
      orderId: orderId,
    },
  });
};

const deleteOrderService = async (orderId) => {
  return await Order.destroy({
    where: {
      orderId: orderId,
    },
  });
};

module.exports = {
  getOrdersService,
  getOrdersByUserIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
};
