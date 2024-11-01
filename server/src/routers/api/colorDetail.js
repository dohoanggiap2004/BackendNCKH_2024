const express = require('express')
const router = express.Router()
const Color_DetailController = require('../../app//controllers/apiController/Color_DetailController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')


router.get('/', Color_DetailController.getColorDetails)
router.get('/:productId', Color_DetailController.getColorDetailByProductId)
router.get('/:productId/:colorId', Color_DetailController.getColorDetailById)
router.post('/', Color_DetailController.createColorDetail)
router.put('/', Color_DetailController.updateColorDetail)
router.delete('/', Color_DetailController.deleteColorDetail)

module.exports = router