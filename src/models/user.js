const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Garante que o campo não seja vazio
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Garante que o email seja único
      validate: {
        isEmail: true, // Valida que o formato seja de um email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Garante que a senha tenha entre 8 e 100 caracteres
      },
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Pontos padrão ao criar um usuário
      validate: {
        min: 0, // Garante que os pontos sejam sempre positivos
      },
    },
  },
  {
    sequelize, // Instância do Sequelize
    modelName: 'user', // Nome do modelo
    tableName: 'users', // Nome da tabela no banco
    timestamps: true, // Adiciona `createdAt` e `updatedAt`
  }
);

module.exports = User;
