const User = require("../models/user");
const Transaction = require("../models/transaction");

class UserController {
static async getTransactions(req, res) {
  try {
    const authenticatedUser = req.user; 
    if (!authenticatedUser) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const transactions = await Transaction.findAll({ where: { userId: authenticatedUser.id } });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
}

static async getPoints(req, res) {
  try {
    const authenticatedUser = req.user; 
    if (!authenticatedUser) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // Buscar o usuário
    const user = await User.findByPk(authenticatedUser.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Somar os valores das transações de tipo 'deposit' e subtrair as de tipo 'redeem'
    const transactions = await Transaction.findAll({
      where: { userId: user.id }
    });

    const totalPoints = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.json({ points: totalPoints });
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ error: "Failed to fetch points." });
  }
}


}

module.exports = UserController;
