
const { User } = require("../../app/models");
const getUsersService = async () => {
    const users = await User.findAll({
        where: { role: 'user' },
        attributes: { exclude: ['password'] },
    });
    return users;

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
