const {
    getVouchersService,
    getVoucherByCodeService,
    createVoucherService,
    updateVoucherService,
    deleteVoucherService,
  } = require("../../../services/api/voucherService");
  class VoucherController {
    async getVouchers(req, res) {
      try {
        const vouchers = await getVouchersService();
  
        if (!vouchers) {
          return res.status(200).json({ message: "voucher not found" });
        }
  
        res.status(200).json({
          data: vouchers,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getVoucherByCode(req, res) {
      try {
        if (!req?.params?.voucherCode)
          return res.status(400).json({ message: "voucherCode is required" });
  
        const voucherCode = req.params.voucherCode;
        const voucher = await getVoucherByCodeService(voucherCode);
  
        if (!voucher) {
          return res.status(200).json({ message: "voucher not found" });
        }
  
        res.status(200).json({
          data: voucher,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createVoucher(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Voucher information is required" });
  
        const voucher = req.body;
        const newVoucher = await createVoucherService(voucher);
  
        res.status(201).json({
            newVoucher: newVoucher,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateVoucher(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Voucher information is required" });
  
        const voucher = req.body;
        const [result] = await updateVoucherService(voucher);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No voucher changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteVoucher(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Voucher information is required" });
  
        const voucherId = req.body.voucherId;
        const result = await deleteVoucherService(voucherId);
        if (result === 0) return res.status(200).json({ message: "No voucher be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new VoucherController();
  