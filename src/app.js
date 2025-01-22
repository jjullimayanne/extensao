require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const { connectRabbitMQ } = require("./config/rabbitmq");
const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

const startServer = async () => {
  try {
    await sequelize.sync();
    await connectRabbitMQ();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
