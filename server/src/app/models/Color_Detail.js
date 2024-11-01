// models/Color_Detail.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Color_Detail = sequelize.define('Color_Detail', {
  productId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'productId'
    }
  },
  colorId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Color',
      key: 'colorId'
    }
  },
  imageURL: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'Color_Detail',
  timestamps: false,
});

module.exports = Color_Detail;
