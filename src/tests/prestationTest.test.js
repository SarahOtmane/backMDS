const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const prestationController = require('../controllers/prestationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Prestation = require('../models/prestationModel');

jest.mock('../models/prestationModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in prestationRoute.js
app.get('/', prestationController.getAllPresta);
app.get('/:id_prestation', prestationController.getAPrestation);
app.get('/job/:id_job', prestationController.getAllPrestaOfJob);
app.post('/', jwtMiddleware.isAdmin, prestationController.createAPrestation);
app.put('/:id_prestation', jwtMiddleware.isAdmin, prestationController.putAPresta);
app.delete('/:id_prestation', jwtMiddleware.isAdmin, prestationController.deleteAPresta);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Prestation Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAPrestation', () => {
    test('should create a new prestation', async () => {
      Prestation.findOne.mockResolvedValue(null);
      Prestation.create.mockResolvedValue({ id: 1, reparationType: 'Repair 1', priceSuggested: 100, id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          reparationType: 'Repair 1',
          priceSuggested: 100,
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Réparation créée avec succés.');
    });

    test('should return 401 if prestation already exists', async () => {
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Repair 1', priceSuggested: 100, id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          reparationType: 'Repair 1',
          priceSuggested: 100,
          id_job: 1
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Cette prestation existe déjà.');
    });
  });

  describe('getAPrestation', () => {
    test('should get a specific prestation by id', async () => {
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Repair 1', priceSuggested: 100, id_job: 1 });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.reparationType).toBe('Repair 1');
    });
  });

  describe('putAPresta', () => {
    test('should update a prestation', async () => {
      Prestation.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          reparationType: 'Updated Repair',
          priceSuggested: 150,
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Prestation mise à jour avec succès.');
    });
  });

  describe('deleteAPresta', () => {
    test('should delete a prestation', async () => {
      Prestation.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Prestation supprimée avec succès.');
    });
  });

  describe('getAllPresta', () => {
    test('should get all prestations', async () => {
      Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Repair 1', priceSuggested: 100, id_job: 1 }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].reparationType).toBe('Repair 1');
    });
  });

  describe('getAllPrestaOfJob', () => {
    test('should get all prestations of a specific job', async () => {
      Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Repair 1', priceSuggested: 100, id_job: 1 }]);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].id_job).toBe(1);
    });
  });
});
