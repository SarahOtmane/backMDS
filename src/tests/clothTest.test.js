const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const clothController = require('../controllers/clothConntroller');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Cloth = require('../models/clothModel');

jest.mock('../models/clothModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in clothRoute.js
app.get('/', clothController.getAllClothes);
app.get('/:id_cloth', clothController.getACloth);
app.get('/job/:id_job', clothController.getAllClothesOfJob);

// Routes for admins
app.post('/', jwtMiddleware.isAdmin, clothController.createACloth);
app.put('/:id_cloth', jwtMiddleware.isAdmin, clothController.putACloth);
app.delete('/:id_cloth', jwtMiddleware.isAdmin, clothController.deleteACloth);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Cloth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createACloth', () => {
    test('should create a new cloth', async () => {
      Cloth.findOne.mockResolvedValue(null);
      Cloth.create.mockResolvedValue({ id: 1, categorie: 'Category 1', clothType: 'Type 1', id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          categorie: 'Category 1',
          clothType: 'Type 1',
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Habit créé avec succès.');
    });
  });

  describe('putACloth', () => {
    test('should update a cloth', async () => {
      Cloth.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          categorie: 'Updated Category',
          clothType: 'Updated Type',
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cloth mis à jour avec succès.');
    });
  });

  describe('deleteACloth', () => {
    test('should delete a cloth', async () => {
      Cloth.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Habit supprimé avec succès.');
    });
  });

  describe('getAllClothes', () => {
    test('should get all clothes', async () => {
      Cloth.findAll.mockResolvedValue([{
        id: 1, categorie: 'Category 1', clothType: 'Type 1' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].categorie).toBe('Category 1');
    });
  }); 
  
  describe('getAllClothesOfJob', () => {
    test('should get all clothes of a specific job', async () => {
      Cloth.findAll.mockResolvedValue([{ id: 1, categorie: 'Category 1', clothType: 'Type 1', id_job: 1 }]);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].id_job).toBe(1);
    });
  });

  describe('getACloth', () => {
    test('should get a specific cloth by id', async () => {
      Cloth.findOne.mockResolvedValue({ id: 1, categorie: 'Category 1', clothType: 'Type 1' });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.categorie).toBe('Category 1');
    });
  });
});
