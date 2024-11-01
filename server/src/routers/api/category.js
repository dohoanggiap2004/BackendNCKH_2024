const express = require('express')
const router = express.Router()
const CategoryController = require('../../app//controllers/apiController/CategoryController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', CategoryController.getCategories)
router.get('/:categoryId', CategoryController.getCategoryById)
router.post('/', CategoryController.createCategory)
router.put('/', CategoryController.updateCategory)
router.delete('/', CategoryController.deleteCategory)

module.exports = router