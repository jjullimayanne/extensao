const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaction extends Model {}

Transaction.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nome da tabela associada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false, // Define obrigatório
      validate: {
        isIn: [['deposit', 'redeem']], // Restringe os valores para 'deposit' ou 'redeem'
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false, // Define obrigatório
      validate: {
        min: 1, // Valor mínimo para transações
      },
    },
  },
  {
    sequelize,
    modelName: 'transaction', // Nome do modelo
    tableName: 'transactions', // Nome da tabela no banco
    timestamps: true, // Inclui createdAt e updatedAt
  }
);

module.exports = Transaction;
