const Coupon = require("../models/coupon");
const User = require("../models/user");
const Transaction = require("../models/transaction");

class CouponController {
  static async listCoupons(req, res) {
    try {
      const coupons = await Coupon.findAll();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: "Failed to list coupons." });
    }
  }

  static async addCoupon(req, res) {
    try {
      const { description, cost, validUntil } = req.body;

      const adminEmail = "admin@example.com"; 
      const authenticatedUser = req.user; 

      if (!authenticatedUser || authenticatedUser.email !== adminEmail) {
        return res.status(403).json({ error: "Access denied. Only the admin can create coupons." });
      }

      const coupon = await Coupon.create({ description, cost, validUntil });
      res.status(201).json({ message: "Coupon created successfully.", coupon });
    } catch (error) {
      res.status(500).json({ error: "Failed to create coupon." });
    }
  }

  static async redeemCoupon(req, res) {
    try {
      const { couponId } = req.body;
  
      const authenticatedUser = req.user; 
      if (!authenticatedUser) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
      }
  
      // Buscar o usuário
      const user = await User.findByPk(authenticatedUser.id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Buscar o cupom
      const coupon = await Coupon.findByPk(couponId);
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found." });
      }
  
      // Verificar se o usuário tem pontos suficientes
      if (user.points < coupon.cost) {
        return res.status(400).json({ error: "Insufficient points." });
      }
  
      // Deduzir os pontos do usuário
      user.points -= coupon.cost;
      await user.save();
  
      // Registrar a transação de resgate
      await Transaction.create({
        userId: user.id,
        type: "redeem",
        amount: -coupon.cost,  // Os pontos são subtraídos no tipo "redeem"
      });
  
      res.json({ message: "Coupon redeemed successfully.", coupon });
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      res.status(500).json({ error: "Failed to redeem coupon." });
    }
  }
  

}

module.exports = CouponController;
