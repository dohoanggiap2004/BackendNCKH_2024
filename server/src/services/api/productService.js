const { Product } = require("../../app/models");
const { sequelize } = require("../../config/sequelizeConnect");
const normalizeProductData = require("../../utils/productNormalizer");
const getProductsService = async () => {
  const [results] = await sequelize.query(`
    SELECT 
        p.*,
        cd.imageURL, -- Thêm imageURL vào truy vấn
        c.colorId,
        c.colorName
    FROM 
        products AS p
    JOIN 
        color_detail AS cd ON p.productId = cd.productId
    JOIN 
        color AS c ON cd.colorId = c.colorId;
  `);

  // Xử lý dữ liệu để nhóm màu sắc theo sản phẩm
    return normalizeProductData(results)
};

const getProductsByCategoryIdService = async (categoryId) => {
  const [results] = await sequelize.query(`
    SELECT 
        p.*,
        cd.imageURL, -- Thêm imageURL vào truy vấn
        c.colorId,
        c.colorName
    FROM 
        products AS p
    JOIN 
        color_detail AS cd ON p.productId = cd.productId
    JOIN 
        color AS c ON cd.colorId = c.colorId
    WHERE p.categoryId = ${categoryId};
  `);

  return normalizeProductData(results)
};

const getProductByIdService = async (productId) => {
  const [results] = await sequelize.query(`
    SELECT 
        p.*,
        cd.imageURL, -- Thêm imageURL vào truy vấn
        c.colorId,
        c.colorName
    FROM 
        products AS p
    JOIN 
        color_detail AS cd ON p.productId = cd.productId
    JOIN 
        color AS c ON cd.colorId = c.colorId
    WHERE p.productId = ${productId};
  `);

  return normalizeProductData(results)
};

const createProductService = async (product) => {
  return await Product.create(product);
};

const updateProductService = async (product) => {
  const { productId, ...updateFields } = product;

  return await Product.update(updateFields, {
    where: {
      productId: productId,
    },
  });
};

const deleteProductService = async (productId) => {
  return await Product.destroy({
    where: {
      productId: productId,
    },
  });
};

module.exports = {
  getProductsService,
  getProductsByCategoryIdService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
};
