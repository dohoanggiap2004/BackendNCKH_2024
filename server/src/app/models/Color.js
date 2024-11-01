// models/Color.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Color = sequelize.define('Color', {
  colorId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  colorName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  colorRGB: {
    type: DataTypes.STRING(7)
  }
}, {
  tableName: 'Color',
  timestamps: false
});

module.exports = Color;
