const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Coupon extends Model {}

Coupon.init(
  {
    description: { type: DataTypes.STRING, allowNull: false },
    cost: { type: DataTypes.INTEGER, allowNull: false },
    validUntil: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: "coupon" }
);

module.exports = Coupon;
