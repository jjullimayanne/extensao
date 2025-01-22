const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  name: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { sequelize, modelName: 'user' });

module.exports = User;
