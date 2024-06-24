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
      Cloth.create.mockResolvedValue({ id: 1, categorie: 'Haut', clothType: 'Vestes', id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          categorie: 'Haut',
          clothType: 'Vestes',
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Habit créé avec succès.');
    });

    test('should return 401 if cloth already exists', async () => {
      Cloth.findOne.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .post('/')
        .send({
          categorie: 'Haut',
          clothType: 'Vestes',
          id_job: 1
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Cet habit existe déjà.');
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
      expect(response.body.message).toEqual('Cloth mis à jour avec succès.');
    });

    test('should return 401 if cloth not found', async () => {
      Cloth.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/1')
        .send({
          categorie: 'Updated Category',
          clothType: 'Updated Type',
          id_job: 1
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Cet habit non trouvé.');
    });
  });

  describe('deleteACloth', () => {
    test('should delete a cloth', async () => {
      Cloth.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Habit supprimé avec succès.');
    });

    test('should return 404 if cloth not found', async () => {
      Cloth.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Habit non trouvé.');
    });
  });

  describe('getAllClothes', () => {
    test('should get all clothes', async () => {
      Cloth.findAll.mockResolvedValue([{ id: 1, categorie: 'Haut', clothType: 'Vestes' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toEqual([{ id: 1, categorie: 'Haut', clothType: 'Vestes' }]);
    });

    test('should return 404 if no clothes found', async () => {
      Cloth.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Auncun cloth trouvé.');
    });
  });

  describe('getAllClothesOfJob', () => {
    test('should get all clothes of a specific job', async () => {
      Cloth.findAll.mockResolvedValue([{ id: 1, categorie: 'Haut', clothType: 'Vestes', id_job: 1 }]);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].id_job).toEqual(1);
    });

    test('should return 404 if no clothes found for the job', async () => {
      Cloth.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Auncun cloth trouvé.');
    });
  });

  describe('getACloth', () => {
    test('should get a specific cloth by id', async () => {
      Cloth.findOne.mockResolvedValue({ id: 1, categorie: 'Haut', clothType: 'Vestes' });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body).toEqual([{ id: 1, categorie: 'Haut', clothType: 'Vestes' }]);
    });

    test('should return 404 if cloth not found', async () => {
      Cloth.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Habit non trouvé.');
    });
  });
});
