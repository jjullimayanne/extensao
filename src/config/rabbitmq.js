const amqp = require('amqplib');

let connection, channel;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('RabbitMQ connected.');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    process.exit(1);
  }
};

module.exports = { connectRabbitMQ, channel };
