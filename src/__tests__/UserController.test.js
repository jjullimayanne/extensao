const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('UserController', () => {
  test('Consulta saldo da wallet', async () => {
    const response = await request(app).get('/transactions/1/wallet');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('balance');
  });

  test('Consulta transações do usuário', async () => {
    const response = await request(app).get('/transactions/1');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
