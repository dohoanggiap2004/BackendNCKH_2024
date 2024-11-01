
const { User } = require("../../app/models");
const getUsersService = async () => {
  return await User.findAll();
};

const getUserByIdService = async (userId) => {
  return await User.findByPk(userId);
};

const createUserService = async (user) => {
  return await User.create(user);
};
const updateUserService = async (user) => {
    const { userId, ...updateFields } = user; 

    return await User.update(updateFields, {
      where: {
        userId: userId 
      }
    });
};

const deleteUserService = async (userId) => {
  return await User.destroy({
    where: {
        userId: userId
    }
  });
};

module.exports = { getUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService, };
