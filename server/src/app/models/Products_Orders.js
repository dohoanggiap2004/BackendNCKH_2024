// models/Products_Orders.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Products_Orders = sequelize.define('Products_Orders', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Products',
      key: 'productId',
    }
  },
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Orders',
      key: 'orderId',
    },
    onDelete: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Products_Orders',
  timestamps: false,
});

module.exports = Products_Orders;
