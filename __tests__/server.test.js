'use strict';

const { app } = require('../src/server.js');

const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('Testing the server', () => {
  it('should respond with a 404 on an invalid route', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });

  it('should respond with a 404 on an invalid method', async () => {
    const response = await request.post('/');
    expect(response.status).toEqual(404);
  });

  it('should create a new record using POST', async () => {
    const response = await request.post('/food').send({
      name: 'pizza',
      calories: 400,
      type: 'CARB',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('pizza');
  });

  it('should read a list of records using GET', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });

  it('should read a record using GET', async () => {
    const response = await request.get('/food/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pizza');
  });

  it('should update a record using PUT', async () => {
    const response = await request.put('/food/1').send({
      name: 'pizza',
      calories: 600,
      type: 'FRUIT',
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('FRUIT');
    expect(response.body.calories).toEqual(600);
  });

  it('should destroy a record using DELETE', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(204);
    expect(response.text).toEqual('');
  });
});
