const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const commandController = require('../controllers/commandController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Command = require('../models/commandModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');
const Cloth = require('../models/clothModel');
const Product = require('../models/productModel');

jest.mock('../models/commandModel');
jest.mock('../models/artisanModel');
jest.mock('../models/prestationModel');
jest.mock('../models/clothModel');
jest.mock('../models/productModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in commandRoute.js
app.post('/:id_artisan', jwtMiddleware.verifyTokenUser, commandController.createACommand);
app.get('/artisans', jwtMiddleware.verifyTokenArtisan, commandController.getCommandOfArtisan);
app.get('/users', jwtMiddleware.verifyTokenUser, commandController.getCommandOfUser);
app.get('/', commandController.getAllCommand);

// Mock middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenUser: (req, res, next) => {
    req.user = { id: 1 };
    next();
  },
  verifyTokenArtisan: (req, res, next) => {
    req.artisan = { id: 1 };
    next();
  }
}));

describe('Command Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createACommand', () => {
    test('should create a new command', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Cloth.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue({ id: 1 });
      Command.create.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .post('/1')
        .send({
          name: 'Command 1',
          picture: 'picture.jpg',
          categorie: 'Category 1',
          clothType: 'Type 1',
          id_job: 1,
          reparationType: 'Repair 1',
          comment: 'Some comment'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Commande créée avec succès.');
    });
  });

  describe('getAllCommand', () => {
    test('should get all commands', async () => {
      Command.findAll.mockResolvedValue([{ id: 1, name: 'Command 1' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe('Command 1');
    });
  });

  describe('getCommandOfArtisan', () => {
    test('should get all commands of a specific artisan', async () => {
      Product.findAll.mockResolvedValue([{ id: 1 }]);
      Command.findAll.mockResolvedValue([{ id: 1, name: 'Command 1' }]);

      const response = await request(app)
        .get('/artisans');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe('Command 1');
    });
  });

  describe('getCommandOfUser', () => {
    test('should get all commands of a specific user', async () => {
      Command.findAll.mockResolvedValue([{ id: 1, name: 'Command 1' }]);

      const response = await request(app)
        .get('/users');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe('Command 1');
    });
  });
});
