const express = require('express')
const router = express.Router()
const Post_CategoryController = require('../../app//controllers/apiController/Post_CategoryController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', Post_CategoryController.getPostCategories)
router.post('/', Post_CategoryController.createPostCategory)
router.put('/', Post_CategoryController.updatePostCategory)
router.delete('/', Post_CategoryController.deletePostCategory)

module.exports = router