const express = require("express");
const Endpoints = require("../utils/constants");
const UserController = require("../controllers/userController");
const CouponController = require("../controllers/couponController");
const MockController = require("../controllers/mockController");
const AuthController = require("../controllers/authController"); // Controlador de autenticação
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
  `${Endpoints.TRANSACTIONS}/:userId`,
  authMiddleware,
  UserController.getTransactions
);
router.get(
  `${Endpoints.TRANSACTIONS}/:userId/wallet`,
  authMiddleware,
  UserController.getWalletBalance
);

// Coupons
router.get(Endpoints.COUPONS, CouponController.listCoupons);
router.post(Endpoints.COUPONS, authMiddleware, CouponController.addCoupon);
router.post(
  `${Endpoints.COUPONS}/redeem`,
  authMiddleware,
  CouponController.redeemCoupon
);

// Authentication
router.post(`${Endpoints.BASE}/register`, AuthController.register);
router.post(`${Endpoints.BASE}/login`, AuthController.login);

module.exports = router;
