const User = require("../models/user");
const Transaction = require("../models/transaction");

class UserController {
  static async getTransactions(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await Transaction.findAll({ where: { userId } });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions." });
    }
  }

  static async getWalletBalance(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.json({ balance: user.points });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet balance." });
    }
  }
}

module.exports = UserController;
