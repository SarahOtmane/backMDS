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
      Prestation.create.mockResolvedValue({ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          reparationType: 'Couture décousue',
          priceSuggested: 10,
          id_job: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Réparation créée avec succés.');
    });

    test('should return 401 if prestation already exists', async () => {
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 });

      const response = await request(app)
        .post('/')
        .send({
          reparationType: 'Couture décousue',
          priceSuggested: 10,
          id_job: 1
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Cette prestation existe déjà.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/')
        .send({
          reparationType: 'Couture décousue',
          priceSuggested: 10,
          id_job: 1
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAPrestation', () => {
    test('should get a specific prestation by id', async () => {
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Couture décousue', priceSuggested: 100, id_job: 1 });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body).toEqual({ id: 1, reparationType: 'Couture décousue', priceSuggested: 100, id_job: 1 });
    });

    test('should return 404 if prestation not found', async () => {
      Prestation.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Prestation non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
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

    test('should return 404 if prestation not found', async () => {
      Prestation.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/1')
        .send({
          reparationType: 'Updated Repair',
          priceSuggested: 150,
          id_job: 1
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Prestation non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/1')
        .send({
          reparationType: 'Updated Repair',
          priceSuggested: 150,
          id_job: 1
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('deleteAPresta', () => {
    test('should delete a prestation', async () => {
      Prestation.destroy.mockResolvedValue({ id: 1, reparationType: 'Couture décousue', priceSuggested: 100, id_job: 1 });

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Prestation supprimée avec succès.');
    });

    test('should return 404 if prestation not found', async () => {
      Prestation.destroy.mockResolvedValue(null);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Prestation non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.destroy.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAllPresta', () => {
    test('should get all prestations', async () => {
      Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toEqual([{ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 }]);
    });

    test('should return 404 if no prestations found', async () => {
      Prestation.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncune prestation trouvée.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAllPrestaOfJob', () => {
    test('should get all prestations of a specific job', async () => {
      Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 }]);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toEqual([{ id: 1, reparationType: 'Couture décousue', priceSuggested: 10, id_job: 1 }]);
    });

    test('should return 404 if no prestations found for the job', async () => {
      Prestation.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncune prestation trouvée.');
    });

    test('should handle errors gracefully', async () => {
      Prestation.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/job/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });
});
