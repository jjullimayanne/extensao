const { channel } = require("../config/rabbitmq");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const Logger = require("../utils/logger");

class MockController {
  static async addPoints(req, res) {
    try {
      const { materialType, quantity } = req.body;
  
      const authenticatedUser = req.user; 
      if (!authenticatedUser) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
      }
  
      const user = await User.findByPk(authenticatedUser.id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      const pointsPerItem = materialType === "pet" ? 10 : 0;
      const totalPoints = pointsPerItem * quantity;
  
      // Atualizar pontos do usuário e salvar a transação
      user.points += totalPoints;
      await user.save();
  
      // Registrar a transação de depósito
      await Transaction.create({
        userId: user.id,
        type: "deposit",
        amount: totalPoints,
      });
  
      res.json({ message: "Points added successfully.", points: totalPoints });
    } catch (error) {
      console.error("Error adding points:", error);
      res.status(500).json({ error: "Failed to add points." });
    }
  }
  
}

module.exports = MockController;
