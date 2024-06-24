const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Job = require('../models/jobModel');

jest.mock('../models/jobModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in jobRoute.js
app.get('/', jobController.getAllJobs);
app.get('/:name_job', jobController.getAJob);
app.get('/id/:id_job', jobController.getNameJob);
app.post('/', jwtMiddleware.isAdmin, jobController.createAJob);
app.put('/:id_job', jwtMiddleware.isAdmin, jobController.putAJob);
app.delete('/:id_job', jwtMiddleware.isAdmin, jobController.deleteAJob);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Job Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAJob', () => {
    test('should create a new job', async () => {
      Job.findOne.mockResolvedValue(null);
      Job.create.mockResolvedValue({ id: 1, name: 'Couture' });

      const response = await request(app)
        .post('/')
        .send({
          name: 'Couture'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Job créé avec succès.');
    });

    test('should return 401 if job already exists', async () => {
      Job.findOne.mockResolvedValue({ id: 1, name: 'Couture' });

      const response = await request(app)
        .post('/')
        .send({
          name: 'Couture'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Ce job existe déjà.');
    });
  });

  describe('getAJob', () => {
    test('should get a specific job by name', async () => {
      Job.findOne.mockResolvedValue({ id: 1, name: 'Couture' });

      const response = await request(app)
        .get('/Couture');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe({ id: 1, name: 'Couture' });
    });

    test('should return 404 if job not found', async () => {
      Job.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/Couture');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Job non trouvé.');
    });
  });

  describe('getNameJob', () => {
    test('should get a specific job by id', async () => {
      Job.findOne.mockResolvedValue({ id: 1, name: 'Couture' });

      const response = await request(app)
        .get('/id/1');

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe({ id: 1, name: 'Couture' });
    });

    test('should return 404 if job not found', async () => {
      Job.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/id/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Job non trouvé.');
    });
  });

  describe('putAJob', () => {
    test('should update a job', async () => {
      Job.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          name: 'Updated Job'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Job mis à jour avec succès.');
    });

    test('should return 404 if job not found', async () => {
      Job.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/1')
        .send({
          name: 'Updated Job'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Job non trouvé.');
    });
  });

  describe('deleteAJob', () => {
    test('should delete a job', async () => {
      Job.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Job supprimé avec succès.');
    });

    test('should return 404 if job not found', async () => {
      Job.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Job non trouvé.');
    });
  });

  describe('getAllJobs', () => {
    test('should get all jobs', async () => {
      Job.findAll.mockResolvedValue([{ id: 1, name: 'Couture' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe([{ id: 1, name: 'Couture' }]);
    });

    test('should return 404 if no jobs found', async () => {
      Job.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncun job trouvé.');
    });
  });
});
