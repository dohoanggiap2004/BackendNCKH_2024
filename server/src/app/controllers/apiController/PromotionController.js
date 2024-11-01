const {
    getPromotionsService,
    getPromotionByIdService,
    createPromotionService,
    updatePromotionService,
    deletePromotionService
  } = require("../../../services/api/promotionService");
  class PromotionController {
    async getPromotions(req, res) {
      try {
        const promotions = await getPromotionsService();
  
        if (!promotions) {
          return res.status(200).json({ message: "promotion not found" });
        }
  
        res.status(200).json({
          data: promotions,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async getPromotionById(req, res) {
      try {
        if (!req?.params?.promotionId)
          return res.status(400).json({ message: "Color id is required" });
  
        const promotionId = req.params.promotionId;
        const promotion = await getPromotionByIdService(promotionId);
  
        if (!promotion) {
          return res.status(200).json({ message: "promotion not found" });
        }
  
        res.status(200).json({
          data: promotion,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async createPromotion(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Promotion information is required" });
  
        const promotion = req.body;
        const newPromotion = await createPromotionService(promotion);
  
        res.status(201).json({
            newPromotion: newPromotion,
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async updatePromotion(req, res) {
      try {
        if (!req?.body)
         return res.status(400).json({ message: "Promotion information is required" });
  
        const promotion = req.body;
        const [result] = await updatePromotionService(promotion);
      //   console.log(result)
        if (result === 0) return res.status(200).json({ message: "No promotion changed" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  
    async deletePromotion(req, res) {
      try {
        if (!req?.body)
          return res.status(400).json({ message: "Promotion information is required" });
  
        const promotionId = req.body.promotionId;
        const result = await deletePromotionService(promotionId);
        if (result === 0) return res.status(200).json({ message: "No promotion be deleted" });
  
        res.status(200).json({
          rowsEffected: result,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  module.exports = new PromotionController();
  