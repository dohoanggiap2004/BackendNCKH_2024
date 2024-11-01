const express = require('express')
const router = express.Router()
const PromotionController = require('../../app//controllers/apiController/PromotionController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', PromotionController.getPromotions)
router.get('/:promotionId', PromotionController.getPromotionById)
router.post('/', PromotionController.createPromotion)
router.put('/', PromotionController.updatePromotion)
router.delete('/', PromotionController.deletePromotion)

module.exports = router