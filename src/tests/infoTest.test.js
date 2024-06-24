const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const infoController = require('../controllers/infoController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Info = require('../models/infoModel');

jest.mock('../models/infoModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in infoRoute.js
app.get('/', infoController.getAllInfo);
app.get('/:id_info', infoController.getAnInfo);
app.post('/', jwtMiddleware.isAdmin, infoController.createAnInfo);
app.put('/:id_info', jwtMiddleware.isAdmin, infoController.putAnInfo);
app.delete('/:id_info', jwtMiddleware.isAdmin, infoController.deleteAnInfo);

// Mock admin middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  isAdmin: (req, res, next) => {
    req.user = { role: 'admin' };
    next();
  },
}));

describe('Info Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAnInfo', () => {
    test('should create a new info', async () => {
      Info.findOne.mockResolvedValue(null);
      Info.create.mockResolvedValue({ id: 1, name: 'instaLink', content: 'Le lien insta' });

      const response = await request(app)
        .post('/')
        .send({
          name: 'instaLink',
          content: 'Le lien insta'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Info créé avec succès. Le nom : instaLink');
    });

    test('should return 401 if info already exists', async () => {
      Info.findOne.mockResolvedValue({ id: 1, name: 'instaLink' });

      const response = await request(app)
        .post('/')
        .send({
          name: 'instaLink',
          content: 'Le lien insta'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Cette info existe déjà.');
    });
  });

  describe('getAnInfo', () => {
    test('should get a specific info by id', async () => {
        Info.findOne.mockResolvedValue({ id: 1, name: 'instaLink', content: 'Le lien insta' });

        const response = await request(app)
            .get('/1');

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
        expect(response.body).toEqual({ id: 1, name: 'instaLink', content: 'Le lien insta' }); // Corrected here
    });

    test('should return 404 if info not found', async () => {
        Info.findOne.mockResolvedValue(null);

        const response = await request(app)
            .get('/1');

        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Info non trouvé.');
    });
});

  describe('putAnInfo', () => {
    test('should update an info', async () => {
      Info.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          name: 'Updated Info',
          content: 'Updated Content'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Information mise à jour avec succès.');
    });

    test('should return 404 if info not found', async () => {
      Info.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/1')
        .send({
          name: 'Updated Info',
          content: 'Updated Content'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Information non trouvé.');
    });
  });

  describe('deleteAnInfo', () => {
    test('should delete an info', async () => {
      Info.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Information supprimée avec succès.');
    });

    test('should return 404 if info not found', async () => {
      Info.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Information non trouvé.');
    });
  });

  describe('getAllInfo', () => {
    test('should get all infos', async () => {
      Info.findAll.mockResolvedValue([{ id: 1, name: 'instaLink', content: 'Le lien insta' }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toEqual([{ id: 1, name: 'instaLink', content: 'Le lien insta' }]);
    });

    test('should return 404 if no infos found', async () => {
      Info.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Auncune information trouvée.');
    });
  });
});
