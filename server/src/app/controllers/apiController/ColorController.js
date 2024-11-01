const {
    getColorsService,
    getColorByIdService,
    createColorService,
    updateColorService,
    deleteColorService
  } = require("../../../services/api/colorService");
  class ColorController {
    async getColors(req, res) {
      try {
        const colors = await getColorsService();
  
        if (!colors) {
          return res.status(200).json({ message: "colors not found" });
        }
  
        res.status(200).json({
          data: colors,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getColorById(req, res) {
      try {
        if (!req?.params?.colorId)
          return res.status(400).json({ message: "Color id is required" });
  
        const colorId = req.params.colorId;
        const color = await getColorByIdService(colorId);
  
        if (!color) {
          return res.status(200).json({ message: "color not found" });
        }
  
        res.status(200).json({
          data: color,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createColor(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Color information is required" });
  
        const color = req.body;
        const newColor = await createColorService(color);
  
        res.status(201).json({
            newColor: newColor,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updateColor(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Color information is required" });
  
        const color = req.body;
        const [result] = await updateColorService(color);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No color changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deleteColor(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Color information is required" });
  
        const colorId = req.body.colorId;
        const result = await deleteColorService(colorId);
        if (result === 0) return res.status(200).json({ message: "No color be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new ColorController();
  