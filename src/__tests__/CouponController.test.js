const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('CouponController', () => {
  test('Lista cupons disponíveis', async () => {
    const response = await request(app).get('/coupons');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Cadastra um novo cupom', async () => {
    const response = await request(app)
      .post('/coupons')
      .send({
        description: 'Cupom Teste',
        cost: 20,
        validUntil: '2025-12-31',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('description', 'Cupom Teste');
  });

  test('Resgata um cupom', async () => {
    const response = await request(app)
      .post('/coupons/redeem')
      .send({
        userId: 1,
        couponId: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Coupon redeemed successfully.');
  });
});
