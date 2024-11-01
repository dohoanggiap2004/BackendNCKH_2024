// models/Product.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Product = sequelize.define('Products', {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  size: {
    type: DataTypes.STRING(50)
  },
  stockQuantity: {
    type: DataTypes.INTEGER
  },
  detail: {
    type: DataTypes.TEXT
  },
  introduction: {
    type: DataTypes.TEXT
  },
  careInstruction: {
    type: DataTypes.TEXT
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'categoryId'
    }
  },
  promotionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Promotions',
      key: 'promotionId'
    }
  }
}, {
  tableName: 'Products',
  timestamps: false
});

module.exports = Product;
