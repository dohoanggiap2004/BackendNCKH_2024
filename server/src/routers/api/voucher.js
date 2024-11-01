const express = require('express')
const router = express.Router()
const VoucherController = require('../../app//controllers/apiController/VoucherController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/', VoucherController.getVouchers)
router.get('/:voucherCode', VoucherController.getVoucherByCode)
router.post('/', VoucherController.createVoucher)
router.put('/', VoucherController.updateVoucher)
router.delete('/', VoucherController.deleteVoucher)

module.exports = router