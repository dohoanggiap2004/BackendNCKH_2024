
const { User_Address } = require('../../app/models')

const getUser_AddressByUserIdService = async (userId) => {
  return await User_Address.findAll({
    where: {
        userId: userId
    }
  });
};

const getUser_AddressByIdService = async (addressId) => {
  return await User_Address.findByPk(addressId);
};

const createUser_AddressService = async (user_address) => {
  return await User_Address.create(user_address);
};

const updateUser_AddressService = async (user_address) => {
    const { addressId, ...updateFields } = user_address; 

    return await User_Address.update(updateFields, {
      where: {
        addressId: addressId 
      }
    });
};

const deleteUser_AddressService = async (addressId) => {
  return await User_Address.destroy({
    where: {
        addressId: addressId
    }
  });
};

module.exports = { getUser_AddressByUserIdService, getUser_AddressByIdService, createUser_AddressService, updateUser_AddressService, deleteUser_AddressService, };
