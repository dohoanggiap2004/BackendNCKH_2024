// models/Voucher.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Voucher = sequelize.define('Vouchers', {
  voucherId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  voucherCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  discountValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
}, {
  tableName: 'Vouchers',
  timestamps: false
});

module.exports = Voucher;
