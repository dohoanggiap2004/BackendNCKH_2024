
const { Voucher } = require("../../app/models");

const getVouchersService = async () => {
  return await Voucher.findAll();
};

const getVoucherByCodeService = async (voucherCode) => {
  return await Voucher.findOne({
    where: {
        voucherCode: voucherCode,
    }
  });
};

const createVoucherService = async (voucher) => {
  return await Voucher.create(voucher);
};
const updateVoucherService = async (voucher) => {
    const { voucherId, ...updateFields } = voucher; 

    return await Voucher.update(updateFields, {
      where: {
        voucherId: voucherId 
      }
    });
};

const deleteVoucherService = async (voucherId) => {
  return await Voucher.destroy({
    where: {
        voucherId: voucherId
    }
  });
};

module.exports = { getVouchersService, getVoucherByCodeService, createVoucherService, updateVoucherService, deleteVoucherService, };
