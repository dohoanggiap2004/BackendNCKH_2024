const {sequelize} = require('../../config/sequelizeConnect')

//total quantity of user
const countUsersService = async () => {
    const [rows] = await sequelize.query('SELECT COUNT(*) AS userCount FROM users');
    return rows[0].userCount;
}

//total revenue of month
const calculateRevenueService = async () => {
    const [rows] = await sequelize.query('SELECT DATE_FORMAT(orderDate, \'%Y-%m\') AS month, SUM(totalPayment) AS' +
        ' totalRevenue FROM orders WHERE orderStatus = "Đã giao" GROUP BY  month ORDER BY month;');
    return [rows]
}

//total quantity of selling product desc
const countProductSalesService = async () => {
    const [rows] = await sequelize.query(
        'SELECT l.productId, l.productName, l.price, l.stockQuantity, l.introduction,' +
        ' SUM(lo.quantity) AS' +
        ' totalQuantity \n '
        + 'FROM products_orders lo left join products l ON lo.productId = l.productId ' +
        'left join orders o ON lo.orderId = o.orderId ' +
        'WHERE o.orderStatus = "Đã giao"'
        + ' GROUP BY l.productId, l.productName, l.price, l.stockQuantity, l.introduction \n'
        + 'ORDER BY totalQuantity DESC\n'
        + 'LIMIT :limit', {
            replacements: {
                limit: 10
            }
        });
    return [rows]
}

//count available products
const countAvailableProductsService = async () => {
    const [rows] = await sequelize.query('SELECT COUNT(*) AS avaiLaptops from products where stockQuantity != 0')
    return rows[0].avaiLaptops
}

//count total quantity of order
const countOrdersService = async () => {
    const [rows] = await sequelize.query('SELECT COUNT(*) as totalQuantityOrder FROM orders WHERE orderStatus != "Đã' +
        ' hủy"')
    const [rows2] = await sequelize.query('SELECT COUNT(*) as totalQuantityOrderSuccess FROM orders WHERE orderStatus =' +
        ' "Đã giao"')
    const data = {
        totalQuantityOrder: rows[0].totalQuantityOrder,
        totalQuantityOrderSuccess: rows2[0].totalQuantityOrderSuccess,
    }
    return data
}

module.exports = {
    countUsersService,
    calculateRevenueService,
    countProductSalesService,
    countAvailableProductsService,
    countOrdersService
}
