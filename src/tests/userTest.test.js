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
app.put('/updatePassword', jwtMiddleware.verifyTokenUser, userController.updatePassword);
app.delete('/', jwtMiddleware.verifyTokenUser, userController.deleteAUser);
app.get('/allUsers', jwtMiddleware.isAdmin, userController.getAllUsers);
app.post('/forgotPassword', userController.forgotPassword);
app.post('/resetPassword/:token', userController.resetPassword);

// Mock middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenUser: (req, res, next) => {
    req.user = { id: 1 };
    next();
  },
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  }
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
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'password123',
          mobile: '1234567890',
          streetAdress: '123 Street',
          city: 'City',
          postalCode: '12345',
          country: 'Country'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Utilisateur créé avec succès. L'email : test@example.com");
    });

    test('should return 409 if email already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Cet email existe déjà.');
    });

    test('should return 401 if trying to create admin user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          role: 'admin'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Vous ne pouvez pas créer un utilisateur avec le rôle admin.');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });

  describe('loginAUser', () => {
    test('should login a user', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      User.findOne.mockResolvedValue(user);
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
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Email ou mot de passe incorrect.');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAUser', () => {
    test('should get a user', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('putAUser', () => {
    test('should update a user', async () => {
      User.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/')
        .send({
          lastname: 'Doe',
          firstname: 'John',
          mobile: '1234567890',
          subscribeNewsletter: true,
          streetAdress: '123 Street',
          city: 'City',
          country: 'Country',
          postalCode: '12345'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur mis à jour avec succès.');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/')
        .send({
          lastname: 'Doe',
          firstname: 'John',
          mobile: '1234567890',
          subscribeNewsletter: true,
          streetAdress: '123 Street',
          city: 'City',
          country: 'Country',
          postalCode: '12345'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/')
        .send({
          lastname: 'Doe',
          firstname: 'John',
          mobile: '1234567890',
          subscribeNewsletter: true,
          streetAdress: '123 Street',
          city: 'City',
          country: 'Country',
          postalCode: '12345'
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('updatePassword', () => {
    test('should update the password for a user', async () => {
      const user = { id: 1, password: 'oldPasswordHash' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('newPasswordHash');

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'oldPassword123',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur mis à jour avec succès.');
    });

    test('should return 400 if old password is incorrect', async () => {
      const user = { id: 1, password: 'oldPasswordHash' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

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

    test('should return 404 if user is not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'oldPassword123',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/updatePassword')
        .send({
          oldPassword: 'oldPassword123',
          password: 'newPassword123'
        })
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('deleteAUser', () => {
    test('should delete a user', async () => {
      User.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Utilisateur supprimé avec succès.');
    });

    test('should return 404 if user not found', async () => {
      User.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      User.destroy.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAllUsers', () => {
    test('should get all users', async () => {
      User.findAll.mockResolvedValue([{ id: 1, email: 'test@example.com' }]);

      const response = await request(app)
        .get('/allUsers')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].email).toBe('test@example.com');
    });

    test('should return 404 if no users found', async () => {
      User.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/allUsers')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncun utilisateur trouvé.');
    });

    test('should handle errors gracefully', async () => {
      User.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/allUsers')
        .set('Authorization', `Bearer fakeToken`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('forgotPassword', () => {
    test('should send a password reset email', async () => {
      const user = { id: 1, email: 'test@example.com' };
      User.findOne.mockResolvedValue(user);
      const testAccount = { user: 'test@ethereal.email', pass: 'password' };
      nodemailer.createTestAccount.mockResolvedValue(testAccount);
      const transporter = { sendMail: jest.fn().mockResolvedValue({ messageId: '123', getTestMessageUrl: jest.fn().mockReturnValue('http://example.com') }) };
      nodemailer.createTransport.mockReturnValue(transporter);

      const response = await request(app)
        .post('/forgotPassword')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Email de réinitialisation envoyé');
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/forgotPassword')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Utilisateur non trouvé');
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/forgotPassword')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur du serveur');
    });
  });

  describe('resetPassword', () => {
    test('should reset the password', async () => {
      const token = jwt.sign({ email: 'test@example.com' }, 'secret');
      jwt.verify.mockResolvedValue({ email: 'test@example.com' });
      const user = { email: 'test@example.com', save: jest.fn() };
      User.findOne.mockResolvedValue(user);
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const response = await request(app)
        .post(`/resetPassword/${token}`)
        .send({ password: 'newPassword123' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Mot de passe réinitialisé avec succès');
    });

    test('should return 400 if token is invalid or expired', async () => {
      jwt.verify.mockRejectedValue(new Error('Token expired'));

      const response = await request(app)
        .post('/resetPassword/invalidToken')
        .send({ password: 'newPassword123' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Le lien de réinitialisation est invalide ou a expiré.');
    });

    test('should handle errors gracefully', async () => {
      jwt.verify.mockResolvedValue({ email: 'test@example.com' });
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/resetPassword/validToken')
        .send({ password: 'newPassword123' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur du serveur');
    });
  });
});
