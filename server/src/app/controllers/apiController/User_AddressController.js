const {
  getUser_AddressByIdService,
  getUser_AddressByUserIdService,
  createUser_AddressService,
  updateUser_AddressService,
  deleteUser_AddressService,
} = require("../../../services/api/user_addressService");
class UserAddressController {
  async getUser_AddressById(req, res) {
    try {
      if (!req?.params?.addressId)
        return res.status(400).json({ message: "Address id is required" });

      const addressId = req.params.addressId;
      const user_address = await getUser_AddressByIdService(addressId);

      if (!user_address) {
        return res.status(200).json({ message: "user_address not found" });
      }

      res.status(200).json({
        data: user_address,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUser_AddressesByUserId(req, res) {
    try {
      if (!req?.params?.userId)
        return res.status(400).json({ message: "User id is required" });

      const userId = req.params.userId;
      const user_addresses = await getUser_AddressByUserIdService(userId);

      if (!user_addresses) {
        return res.status(200).json({ message: "user_address not found" });
      }

      res.status(200).json({
        data: user_addresses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser_Address(req, res) {
    try {
      if (!req?.body)
        return res
          .status(400)
          .json({ message: "User_Address information is required" });

      const user_address = req.body;
      const newUser_Address = await createUser_AddressService(user_address);

      res.status(201).json({
        newUser_Address: newUser_Address,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser_Address(req, res) {
    try {
      if (!req?.body)
        return res
          .status(400)
          .json({ message: "User_Address information is required" });

      const user_address = req.body;
      const [result] = await updateUser_AddressService(user_address);
      //   console.log(result)
      if (result === 0)
        return res.status(200).json({ message: "No user address changed" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteUser_AddressService(req, res) {
    try {
      if (!req?.body)
        return res
          .status(400)
          .json({ message: "User address information is required" });

      const addressId = req.body.addressId;
      const result = await deleteUser_AddressService(addressId);
      if (result === 0)
        return res.status(200).json({ message: "No user address be deleted" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserAddressController();
