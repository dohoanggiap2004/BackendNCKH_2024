const express = require('express')
const router = express.Router()
const ColorController = require('../../app//controllers/apiController/ColorController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')


router.get('/', ColorController.getColors)
router.get('/:colorId', ColorController.getColorById)
router.post('/', ColorController.createColor)
router.put('/', ColorController.updateColor)
router.delete('/', ColorController.deleteColor)

module.exports = router