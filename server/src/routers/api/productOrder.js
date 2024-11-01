const express = require('express')
const router = express.Router()
const Products_OrdersController = require('../../app//controllers/apiController/Products_OrdersController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', Products_OrdersController.getProducts_Orders)
router.get('/:productId/:orderId', Products_OrdersController.getProduct_OrderById)
router.get('/:orderId', Products_OrdersController.getProducts_OrdersByOrderId)
router.post('/', Products_OrdersController.createProductOrder)
router.put('/', Products_OrdersController.updateProductOrder)
router.delete('/', Products_OrdersController.deleteProductOrder)

module.exports = router