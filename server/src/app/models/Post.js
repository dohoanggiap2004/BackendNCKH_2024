// models/Post.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConnect');

const Post = sequelize.define('Posts', {
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  postContent: {
    type: DataTypes.TEXT
  },
  postCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Post_Categories',
      key: 'postCategoryId'
    }
  }
}, {
  tableName: 'Posts',
  timestamps: false
});

module.exports = Post;
