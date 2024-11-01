// models/Post_Categories.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Post_Category = sequelize.define('Post_Categories', {
  postCategoryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postCategoryName: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Post_Categories',
  timestamps: false
});

module.exports = Post_Category;
