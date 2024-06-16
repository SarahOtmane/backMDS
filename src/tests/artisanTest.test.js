const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const artisanController = require('../controllers/artisanController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/artisanModel');
jest.mock('../models/jobModel');
jest.mock('../models/prestationModel');
jest.mock('../models/productModel');
jest.mock('../middlewares/functionsMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the routes
app.post('/register', artisanController.registerAnArtisan);
app.post('/login', artisanController.loginAnArtisan);
app.get('/', jwtMiddleware.verifyTokenArtisan, artisanController.getAnArtisan);
app.put('/', jwtMiddleware.verifyTokenArtisan, artisanController.putAnArtisan);
app.delete('/', jwtMiddleware.verifyTokenArtisan, artisanController.deleteAnArtisan);
app.put('/updatePassword', jwtMiddleware.verifyTokenArtisan, artisanController.updatePassword);
app.get('/allArtisan', artisanController.getAllArtisans);
app.get('/:id_job/:postalcode', artisanController.getAllArtisansFiltre);

// Mock middleware to inject artisan into request
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenArtisan: (req, res, next) => {
    req.artisan = { id: 1 };
    next();
  },
}));

describe('Artisan Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerAnArtisan', () => {
    test('should register a new artisan', async () => {
      Artisan.findOne.mockResolvedValue(null);
      Job.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'type', priceSuggested: 100 });
      Artisan.create.mockResolvedValue({ id: 1 });
      Product.create.mockResolvedValue({});

      const response = await request(app)
        .post('/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          mobile: '1234567890',
          streetAdress: '123 Street',
          city: 'City',
          postalCode: '12345',
          country: 'Country',
          job: 'Job',
          prestations: ['type'],
          siret: '123456789',
          numeroTVA: 'FR123456789'
        });

      expect(response.status).toBe(201);
      expect(response.body.newArtisan).toBeDefined();
      expect(response.body.products).toBeDefined();
    });
  });

  describe('loginAnArtisan', () => {
    test('should login an artisan', async () => {
      const artisan = { id: 1, email: 'johndoe@example.com', password: 'password123' };
      Artisan.findOne.mockResolvedValue(artisan);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/login')
        .send({
          email: 'johndoe@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.token).toBe('fakeToken');
    });
  });

  describe('getAnArtisan', () => {
    test('should get an artisan', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.id).toBe(1);
    });
  });

  describe('putAnArtisan', () => {
    test('should update an artisan', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1, update: jest.fn() });
      Job.findOne.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .put('/')
        .send({
          lastname: 'Doe',
          firstname: 'John',
          password: 'newpassword',
          mobile: '1234567890',
          id_job: 1,
          acceptNewOrder: true,
          streetAdress: '123 Street',
          city: 'City',
          country: 'Country',
          postalCode: '12345'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Artisan mis à jour avec succès.');
    });
  });

  describe('deleteAnArtisan', () => {
    test('should delete an artisan', async () => {
      Artisan.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Artisan supprimé avec succès.');
    });
  });

  describe('getAllArtisans', () => {
    test('should get all artisans', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1 }]);

      const response = await request(app)
        .get('/allArtisan')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('getAllArtisansFiltre', () => {
    test('should filter artisans', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1 }]);

      const response = await request(app)
        .get('/1/12345')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
