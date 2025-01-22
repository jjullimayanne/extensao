const { channel } = require("../config/rabbitmq");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const Logger = require("../utils/Logger");

class MockController {
  static async addPoints(req, res) {
    try {
      const { userId, materialType, quantity } = req.body;

      const pointsPerItem = materialType === "pet" ? 10 : 0;
      const totalPoints = pointsPerItem * quantity;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      user.points += totalPoints;
      await user.save();

      await Transaction.create({
        userId,
        type: "deposit",
        amount: totalPoints,
      });

      res.json({ message: "Points added successfully.", points: totalPoints });
    } catch (error) {
      // Logando o erro
      await Logger.logError("MockController.addPoints", error, {
        body: req.body,
      });
      res.status(500).json({ error: "Failed to add points." });
    }
  }
}

module.exports = MockController;
