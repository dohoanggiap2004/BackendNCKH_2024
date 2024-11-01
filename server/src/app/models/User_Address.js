// models/User_Address.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const User_Address = sequelize.define('User_Address', {
  addressId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  addressDetail: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ward: {
    type: DataTypes.STRING(255)
  },
  district: {
    type: DataTypes.STRING(255)
  },
  city: {
    type: DataTypes.STRING(255)
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'userId'
    }
  }
}, {
  tableName: 'User_Address',
  timestamps: false
});

module.exports = User_Address;
