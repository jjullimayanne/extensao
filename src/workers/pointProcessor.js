const { channel } = require("../config/rabbitmq");
const User = require("../models/user");
const Transaction = require("../models/transaction");

const QUEUE_NAME = "recycling_points";

const processPoints = async (message) => {
  try {
    const { userId, materialType, quantity } = JSON.parse(
      message.content.toString()
    );

    const pointsPerItem = materialType === "pet" ? 10 : 0;
    const totalPoints = pointsPerItem * quantity;

    const user = await User.findByPk(userId);
    if (user) {
      user.points += totalPoints;
      await user.save();

      await Transaction.create({
        userId,
        type: "deposit",
        amount: totalPoints,
      });

      console.log(
        `Processed recycling event for user ${userId}, points: ${totalPoints}`
      );
    }

    channel.ack(message);
  } catch (error) {
    console.error("Failed to process message:", error);
  }
};

const startWorker = async () => {
  await channel.assertQueue(QUEUE_NAME);
  channel.consume(QUEUE_NAME, processPoints);
  console.log("Worker started for queue:", QUEUE_NAME);
};

module.exports = startWorker;
