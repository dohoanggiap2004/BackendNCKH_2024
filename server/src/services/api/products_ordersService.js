
const { Products_Orders } = require('../../app/models')

const getProducts_OrdersService = async () => {
  return await Products_Orders.findAll();
};

const getProducts_OrdersByOrderIdService = async (orderId) => {
  return await Products_Orders.findAll({
    where: {
        orderId: orderId,
    }
  });
};

const getProducts_OrdersByIdService = async (productId, orderId) => {
    return await Products_Orders.findAll({
      where: {
          productId: productId,
          orderId: orderId,
      }
    });
  };

const createProducts_OrdersService = async (products_orders) => {
  return await Products_Orders.create(products_orders);
};

const updateProducts_OrdersService = async (products_orders) => {
    const { productId, orderId,  ...updateFields } = products_orders; 

    return await Products_Orders.update(updateFields, {
      where: {
        productId: productId,
        orderId: orderId,
      }
    });
};

const deleteProducts_OrdersService = async (productId, orderId) => {
  return await Products_Orders.destroy({
    where: {
        productId: productId,
        orderId: orderId,
    }
  });
};

module.exports = { getProducts_OrdersService, getProducts_OrdersByOrderIdService, getProducts_OrdersByIdService, createProducts_OrdersService, updateProducts_OrdersService, deleteProducts_OrdersService };
