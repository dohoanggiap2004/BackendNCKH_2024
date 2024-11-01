// models/Promotion.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Promotion = sequelize.define('Promotions', {
  promotionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  discountPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  promotionPeriod: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Promotions',
  timestamps: false
});

module.exports = Promotion;
