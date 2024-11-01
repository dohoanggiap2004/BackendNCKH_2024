// models/Order.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Order = sequelize.define('Orders', {
  orderId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderStatus: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  orderNotes: {
    type: DataTypes.TEXT
  },
  totalPayment: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  orderName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  orderAddress: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(15)
  },
  paymentMethod: {
    type: DataTypes.STRING(50)
  },
  shippingMethod: {
    type: DataTypes.STRING(50)
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  voucherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Vouchers',
      key: 'voucherId'
    }
  }
}, {
  tableName: 'Orders',
  timestamps: false
});

module.exports = Order;
