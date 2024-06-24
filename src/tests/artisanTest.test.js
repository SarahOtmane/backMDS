const request = require('supertest');
const express = require('express');

const bodyParser = require('body-parser');
const artisanController = require('../controllers/artisanController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');


jest.mock('../models/artisanModel');
jest.mock('../models/jobModel');
jest.mock('../models/prestationModel');
jest.mock('../models/productModel');
jest.mock('../middlewares/functionsMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      Job.findOne.mockResolvedValue({ id: 1, name: 'couture' });
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Couture décousue', priceSuggested: 10 });
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
          job: 'couture',
          prestations: ['Couture décousue'],
          siret: '123456789',
          numeroTVA: 'FR123456789'
        });

      expect(response.status).toBe(201);
      expect(response.body.newArtisan).toBeDefined();
      expect(response.body.products).toBeDefined();
    });

    test('should return 409 if email already exists', async () => {
      Artisan.findOne.mockResolvedValue({ email: 'johndoe@example.com' });

      const response = await request(app)
        .post('/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Cet email existe déjà.');
    });

    test('should return 401 if job does not exist', async () => {
      Artisan.findOne.mockResolvedValue(null);
      Job.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          job: 'NonExistingJob'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Ce métier n\'existe pas');
    });

    test('should return 401 if email format is invalid', async () => {
      Artisan.findOne.mockResolvedValue(null);
      Job.findOne.mockResolvedValue({ id: 1 });
      const mockVerifyEmail = jest.fn().mockReturnValue(false);
      require('../middlewares/functionsMiddleware').verifyEmail = mockVerifyEmail;

      const response = await request(app)
        .post('/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'invalid-email',
          password: 'password123',
          job: 'Job'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('L\'email n\'est pas au bon format');
    });

    test('should return 404 if no prestations provided', async () => {
      Artisan.findOne.mockResolvedValue(null);
      Job.findOne.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .post('/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          job: 'Job',
          prestations: []
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Aucune prestation enregistrée');
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
      expect(response.body.token).toEqual('fakeToken');
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 401 if password is incorrect', async () => {
      const artisan = { id: 1, email: 'johndoe@example.com', password: 'password123' };
      Artisan.findOne.mockResolvedValue(artisan);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'johndoe@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Email ou mot de passe incorrect.');
    });
  });

  describe('getAnArtisan', () => {
    test('should get an artisan', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1, email: 'johndoe@example.com', });

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: 1, email: 'johndoe@example.com', });
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
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

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

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

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 401 if job does not exist', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1, update: jest.fn() });
      Job.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/')
        .send({
          lastname: 'Doe',
          firstname: 'John',
          password: 'newpassword',
          mobile: '1234567890',
          id_job: 999, // Non-existing job
          acceptNewOrder: true,
          streetAdress: '123 Street',
          city: 'City',
          country: 'Country',
          postalCode: '12345'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Ce métier n\'existe pas');
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

    test('should return 404 if artisan not found', async () => {
      Artisan.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });
  });

  describe('getAllArtisans', () => {
    test('should get all artisans', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1, email:'test@gmail.com' }]);

      const response = await request(app)
        .get('/allArtisan')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toEqual([{ id: 1, email:'test@gmail.com' }]);
    });

    test('should return 404 if no artisans found', async () => {
      Artisan.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/allArtisan')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Aucun artisans trouvé.');
    });
  });

  describe('getAllArtisansFiltre', () => {
    test('should filter artisans by job and postal code', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1 }]);

      const response = await request(app)
        .get('/1/12345')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return 404 if no artisans found for the given job and postal code', async () => {
      Artisan.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/1/12345')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Aucun artisans trouvé.');
    });

    test('should filter artisans by job only if postal code is -1', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1 }]);

      const response = await request(app)
        .get('/1/-1')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should filter artisans by postal code only if job is -1', async () => {
      Artisan.findAll.mockResolvedValue([{ id: 1 }]);

      const response = await request(app)
        .get('/-1/12345')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('updatePassword', () => {
    test('should update the password for an artisan', async () => {
      const artisan = { id: 1, password: 'oldPasswordHash' };
      Artisan.findOne.mockResolvedValue(artisan);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newPasswordHash');

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'oldPassword123',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Artisan mis à jour avec succès.');
    });

    test('should return 400 if old password is incorrect', async () => {
      const artisan = { id: 1, password: 'oldPasswordHash' };
      Artisan.findOne.mockResolvedValue(artisan);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'wrongOldPassword',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Mot de passe incorrect.');
    });

    test('should return 404 if artisan is not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'oldPassword123',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });
  });
});
