const express = require("express");
const Endpoints = require("../utils/constants");
const UserController = require("../controllers/userController");
const CouponController = require("../controllers/couponController");
const MockController = require("../controllers/mockController");
const AuthController = require("../controllers/authController"); 
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Health Check
router.get(Endpoints.HEALTH, (req, res) => res.json({ status: "healthy" }));

// Wallet and Transactions
router.post(
  `${Endpoints.TRANSACTIONS}/add-points`,
  authMiddleware,
  MockController.addPoints
);
router.get(
  `${Endpoints.TRANSACTIONS}/wallet-balance`,
  authMiddleware,
  UserController.getTransactions
);


// Coupons
router.get(Endpoints.COUPONS, CouponController.listCoupons);
router.post(Endpoints.COUPONS, authMiddleware, CouponController.addCoupon);
router.post(
  `${Endpoints.COUPONS}/redeem`,
  authMiddleware,
  CouponController.redeemCoupon 
);

// User Points
router.get(`${Endpoints.BASE}/points`, authMiddleware, UserController.getPoints);

// Authentication
router.post(`${Endpoints.BASE}/register`, AuthController.register);
router.post(`${Endpoints.BASE}/login`, AuthController.login);

module.exports = router;
