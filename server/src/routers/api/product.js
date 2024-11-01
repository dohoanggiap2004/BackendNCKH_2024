const express = require('express')
const router = express.Router()
const ProductController = require('../../app//controllers/apiController/ProductController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', ProductController.getProducts)
router.get('/:productId', ProductController.getProductById)
router.get('/category/:categoryId', ProductController.getProductsByCategoryId)
router.post('/', ProductController.createProduct)
router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

module.exports = router