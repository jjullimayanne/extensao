const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Coupon extends Model {}

Coupon.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // O custo deve ser pelo menos 1
      },
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Valida se é uma data
        isAfter: new Date().toISOString(), // A data deve ser futura
      },
    },
  },
  {
    sequelize,
    modelName: 'coupon', // Nome do modelo
    tableName: 'coupons', // Nome da tabela no banco
    timestamps: true, // Inclui createdAt e updatedAt
  }
);

module.exports = Coupon;
