const request = require('supertest');
const app = require('../app'); // Importe o servidor Express
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('MockController - Simulação de reciclagem', () => {
  test('Adiciona pontos ao usuário', async () => {
    const response = await request(app)
      .post('/transactions/add-points')
      .send({
        userId: 1,
        materialType: 'pet',
        quantity: 5,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('points');
    expect(response.body.points).toBe(50); // 10 pontos por garrafa PET
  });
});
