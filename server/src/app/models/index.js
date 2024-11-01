// src/app/models/index.js
const { sequelize } = require('../../config/sequelizeConnect');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');
const Promotion = require('./Promotion');
const Products_Orders = require('./Products_Orders');
const Color = require('./Color');
const Color_Detail = require('./Color_Detail');
const User_Address = require('./User_Address');
const Voucher = require('./Voucher');
const Post_Category = require('./Post_Category');
const Post = require('./Post');

// Thiết lập các mối quan hệ
Category.hasMany(Category, { foreignKey: 'parentCategoryId', as: 'children', onDelete: 'CASCADE' });
Category.belongsTo(Category, { foreignKey: 'parentCategoryId', as: 'parent' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Promotion.hasMany(Product, { foreignKey: 'promotionId' });
Product.belongsTo(Promotion, { foreignKey: 'promotionId' });

Order.belongsToMany(Product, { through: Products_Orders, foreignKey: 'orderId', onDelete: 'CASCADE', });
Product.belongsToMany(Order, { through: Products_Orders, foreignKey: 'productId', onDelete: 'CASCADE' });

Color.belongsToMany(Product, { through: Color_Detail, foreignKey: 'colorId' });
Product.belongsToMany(Color, { through: Color_Detail, foreignKey: 'productId' });

User.hasMany(User_Address, { foreignKey: 'userId' });
User_Address.belongsTo(User, { foreignKey: 'userId' });

Voucher.hasMany(Order, { foreignKey: 'voucherId' });
Order.belongsTo(Voucher, { foreignKey: 'voucherId' });

Post_Category.hasMany(Post, { foreignKey: 'postCategoryId' });
Post.belongsTo(Post_Category, { foreignKey: 'postCategoryId' });

// Xuất tất cả các mô hình
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Category,
  Promotion,
  Products_Orders,
  Color,
  Color_Detail,
  User_Address,
  Voucher,
  Post_Category,
  Post
};
