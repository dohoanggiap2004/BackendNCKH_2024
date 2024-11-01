const {
    getColor_DetailsService,
    getColor_DetailByIdService,
    createColor_DetailService,
    getColor_DetailByProductIdService,
    updateColor_DetailService,
    deleteColor_DetailService
  } = require("../../../services/api/color_detailService");
  class ColorDetailController {
    async getColorDetails(req, res) {
      try {
        const colorDetail = await getColor_DetailsService();
  
        if (!colorDetail) {
          return res.status(200).json({ message: "colorDetail not found" });
        }
  
        res.status(200).json({
          data: colorDetail,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getColorDetailByProductId(req, res) {
      try {
        if (!req?.params?.productId)
          return res.status(400).json({ message: "product id is required" });
  
        const productId = req.params.productId;
        const colorDetail = await getColor_DetailByProductIdService(productId);
  
        if (!colorDetail) {
          return res.status(200).json({ message: "colorDetail not found" });
        }
  
        res.status(200).json({
          data: colorDetail,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

    async getColorDetailById(req, res) {
        try {
          if (!req?.params?.productId || !req?.params?.colorId)
            return res.status(400).json({ message: "product id and color id is required" });
    
          const productId = req.params.productId;
          const colorId = req.params.colorId;
          const colorDetail = await getColor_DetailByIdService(productId, colorId);
    
          if (!colorDetail) {
            return res.status(200).json({ message: "colorDetail not found" });
          }
    
          res.status(200).json({
            data: colorDetail,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
  
    async createColorDetail(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "ColorDetail information is required" });
  
        const colorDetail = req.body;
        const newColorDetail = await createColor_DetailService(colorDetail);
  
        res.status(201).json({
            newColorDetail: colorDetail,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateColorDetail(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "ColorDetail information is required" });
  
        const colorDetail = req.body;
        const [result] = await updateColor_DetailService(colorDetail);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No category changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteColorDetail(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "ColorDetail information is required" });
  
        const productId = req.body.productId;
        const colorId = req.body.colorId;
        const result = await deleteColor_DetailService(productId, colorId);
        if (result === 0) return res.status(200).json({ message: "No ColorDetail be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new ColorDetailController();
  