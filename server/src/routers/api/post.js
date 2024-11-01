const express = require('express')
const router = express.Router()
const PostController = require('../../app//controllers/apiController/PostController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', PostController.getPosts)
router.get('/:postId', PostController.getPostById)
router.get('/category/:postCategoryId', PostController.getPostsByPCId)
router.post('/', PostController.createPost)
router.put('/', PostController.updatePost)
router.delete('/', PostController.deletePost)

module.exports = router