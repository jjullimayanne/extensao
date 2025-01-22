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
      const coupon = await Coupon.create({ description, cost, validUntil });
      res.status(201).json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to create coupon." });
    }
  }

  static async redeemCoupon(req, res) {
    try {
      const { userId, couponId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const coupon = await Coupon.findByPk(couponId);
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found." });
      }

      if (user.points < coupon.cost) {
        return res.status(400).json({ error: "Insufficient points." });
      }

      user.points -= coupon.cost;
      await user.save();

      await Transaction.create({
        userId,
        type: "redeem",
        amount: -coupon.cost,
      });

      res.json({ message: "Coupon redeemed successfully.", coupon });
    } catch (error) {
      res.status(500).json({ error: "Failed to redeem coupon." });
    }
  }
}

module.exports = CouponController;
