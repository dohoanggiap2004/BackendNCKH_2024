const express = require('express')
const router = express.Router()
const User_AddressController = require('../../app//controllers/apiController/User_AddressController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

router.get('/:addressId', User_AddressController.getUser_AddressById)
router.get('/user/:userId', User_AddressController.getUser_AddressesByUserId)
router.post('/', User_AddressController.createUser_Address)
router.put('/', User_AddressController.updateUser_Address)
router.delete('/', User_AddressController.deleteUser_AddressService)

module.exports = router