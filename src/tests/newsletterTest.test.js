const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const newsletterController = require('../controllers/newsletterController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Newsletter = require('../models/newsletterModel');
const User = require('../models/userModel');

jest.mock('../models/newsletterModel');
jest.mock('../models/userModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in newsletterRoute.js
app.post('/', newsletterController.addInNewsletter);
app.get('/', jwtMiddleware.isAdmin, newsletterController.getAllInNewsletter);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Newsletter Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addInNewsletter', () => {
    test('should add an email to the newsletter', async () => {
      User.findOne.mockResolvedValue(null);
      Newsletter.findOne.mockResolvedValue(null);
      Newsletter.create.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Vous êtes inscrit à la newsletter');
    });

    test('should return 401 if email is already subscribed', async () => {
      Newsletter.findOne.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Cet email est inscrit à la newsletter');
    });

    test('should update user if email is associated with a user account', async () => {
      const user = { email: 'test@example.com', subscribeNewsletter: false, save: jest.fn() };
      User.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Vous êtes inscrit à la newsletter');
      expect(user.save).toHaveBeenCalled();
    });

    test('should handle errors gracefully', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAllInNewsletter', () => {
    test('should get all subscribed emails', async () => {
      User.findAll.mockResolvedValue([{ email: 'user@example.com' }]);
      Newsletter.findAll.mockResolvedValue([{ email: 'newsletter@example.com' }]);

      const response = await request(app)
        .get('/')
        .set('Authorization', 'Bearer adminToken');

      expect(response.status).toBe(201);
      expect(response.body.userInscrits.length).toBeGreaterThan(0);
      expect(response.body.emailsInscrits.length).toBeGreaterThan(0);
    });

    test('should return 404 if no emails are subscribed', async () => {
      User.findAll.mockResolvedValue(null);
      Newsletter.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/')
        .set('Authorization', 'Bearer adminToken');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Aucun email n'est inscrit à la newsletter");
    });

    test('should handle errors gracefully', async () => {
      User.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/')
        .set('Authorization', 'Bearer adminToken');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });
});
