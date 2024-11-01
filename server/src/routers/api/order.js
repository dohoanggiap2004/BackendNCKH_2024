const express = require('express')
const router = express.Router()
const OrderController = require('../../app//controllers/apiController/OrderController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', OrderController.getOrders)
router.get('/:userId', OrderController.getOrdersByUserId)
router.post('/', OrderController.createOrder)
router.put('/', OrderController.updateOrder)
router.delete('/', OrderController.deleteOrder)

module.exports = router