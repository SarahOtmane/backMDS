const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const infoController = require('../controllers/infoController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Info = require('../models/infoModel');

jest.mock('../models/infoModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in infoRoute.js
app.get('/', infoController.getAllInfo);
app.get('/:id_info', infoController.getAnInfo);
app.post('/', jwtMiddleware.isAdmin, infoController.createAnInfo);
app.put('/:id_info', jwtMiddleware.isAdmin, infoController.putAnInfo);
app.delete('/:id_info', jwtMiddleware.isAdmin, infoController.deleteAnInfo);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Info Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAnInfo', () => {
    test('should create a new info', async () => {
      Info.findOne.mockResolvedValue(null);
      Info.create.mockResolvedValue({ id: 1, name: 'Info 1', content: 'Content 1' });

      const response = await request(app)
        .post('/')
        .send({
          name: 'Info 1',
          content: 'Content 1'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Info créé avec succès. Le nom : Info 1');
    });
  });

  describe('getAnInfo', () => {
    test('should get a specific info by id', async () => {
      Info.findOne.mockResolvedValue({ id: 1, name: 'Info 1', content: 'Content 1' });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Info 1');
    });
  });

  describe('putAnInfo', () => {
    test('should update an info', async () => {
      Info.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          name: 'Updated Info',
          content: 'Updated Content'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Information mise à jour avec succès.');
    });
  });

  describe('deleteAnInfo', () => {
    test('should delete an info', async () => {
      Info.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Information supprimée avec succès.');
    });
  });

  describe('getAllInfo', () => {
    test('should get all infos', async () => {
      Info.findAll.mockResolvedValue([{ id: 1, name: 'Info 1', content: 'Content 1' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe('Info 1');
    });
  });
});
