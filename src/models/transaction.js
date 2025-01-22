const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaction extends Model {}

Transaction.init({
  userId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // 'deposit' or 'redeem'
  amount: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, modelName: 'transaction' });

module.exports = Transaction;
