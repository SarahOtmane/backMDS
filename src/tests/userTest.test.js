const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

jest.mock('../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in userRoute.js
app.post('/register', userController.registerAUser);
app.post('/login', userController.loginAUser);
app.get('/', jwtMiddleware.verifyTokenUser, userController.getAUser);
app.put('/', jwtMiddleware.verifyTokenUser, userController.putAUser);
app.delete('/', jwtMiddleware.verifyTokenUser, userController.deleteAUser);
app.put('/updatePassword', jwtMiddleware.verifyTokenUser, userController.updatePassword);
app.post('/forgot-password', userController.forgotPassword);
app.post('/reset-password/:token', userController.resetPassword);
app.get('/admin', jwtMiddleware.isAdmin, userController.getAllUsers);

// Mock middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenUser: (req, res, next) => {
    req.user = { id: 1, role: 'user' };
    next();
  },
  isAdmin: (req, res, next) => {
    req.user = { id: 1, role: 'admin' };
    next();
  },
}));

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerAUser', () => {
    test('should register a new user', async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({ id: 1, email: 'test@example.com' });

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstname: 'John',
          lastname: 'Doe'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur créé avec succès. L\'email : test@example.com');
    });

    test('should return 409 if email already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstname: 'John',
          lastname: 'Doe'
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Cet email existe déjà.');
    });

    test('should return 401 if role is admin', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'admin@example.com',
          password: 'password123',
          firstname: 'John',
          lastname: 'Doe',
          role: 'admin'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Vous ne pouvez pas créer un utilisateur avec le rôle admin.');
    });
  });

  describe('loginAUser', () => {
    test('should login a user', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.token).toBe('fakeToken');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });

    test('should return 401 if password is incorrect', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Email ou mot de passe incorrect.');
    });
  });

  describe('getAUser', () => {
    test('should get a user', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });
  });

  describe('putAUser', () => {
    test('should update a user', async () => {
      User.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/')
        .send({
          firstname: 'Updated',
          lastname: 'User'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur mis à jour avec succès.');
    });
  });

  describe('deleteAUser', () => {
    test('should delete a user', async () => {
      User.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur supprimé avec succès.');
    });
  });

  describe('updatePassword', () => {
    test('should update user password', async () => {
      User.findOne.mockResolvedValue({ id: 1, password: 'hashedPassword', update: jest.fn() });
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'password123',
          password: 'newPassword123'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur mis à jour avec succès.');
    });

    test('should return 400 if old password is incorrect', async () => {
      User.findOne.mockResolvedValue({ id: 1, password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'wrongPassword',
          password: 'newPassword123'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Mot de passe incorrect.');
    });
  });

  describe('forgotPassword', () => {
    test('should send forgot password email', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });
      jwt.sign.mockReturnValue('fakeToken');
      nodemailer.createTestAccount.mockResolvedValue({
        user: 'testuser',
        pass: 'testpass'
      });
      const transporter = {
        sendMail: jest.fn().mockResolvedValue({
          messageId: '12345',
          previewUrl: 'http://testurl.com'
        })
      };
      nodemailer.createTransport.mockReturnValue(transporter);

      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Email de réinitialisation envoyé');
      expect(response.body.previewUrl).toBe('http://testurl.com');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé');
    });
  });

  describe('resetPassword', () => {
    test('should reset user password', async () => {
      jwt.verify.mockReturnValue({ email: 'test@example.com' });
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com', update: jest.fn() });
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const response = await request(app)
        .post('/reset-password/fakeToken')
        .send({
          password: 'newPassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Mot de passe réinitialisé avec succès');
    });

    test('should return 400 if token is invalid or expired', async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error('Token expired');
      });

      const response = await request(app)
        .post('/reset-password/fakeToken')
        .send({
          password: 'newPassword123'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Le lien de réinitialisation est invalide ou a expiré.');
    });
  });

  describe('getAllUsers', () => {
    test('should get all users', async () => {
      User.findAll.mockResolvedValue([{ id: 1, email: 'test@example.com' }]);

      const response = await request(app)
        .get('/admin');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].email).toBe('test@example.com');
    });

    test('should return 404 if no users found', async () => {
      User.findAll.mockResolvedValue([]);

      const response = await request(app)
        .get('/admin');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncun utilisateur trouvé.');
    });
  });
});
