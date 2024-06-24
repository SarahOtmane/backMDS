const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Product = require('../models/productModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');

jest.mock('../models/productModel');
jest.mock('../models/artisanModel');
jest.mock('../models/prestationModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in productRoute.js
app.post('/', jwtMiddleware.verifyTokenArtisan, productController.createAProduct);
app.put('/:id_product', jwtMiddleware.verifyTokenArtisan, productController.updateAProduct);
app.delete('/:id_product', jwtMiddleware.verifyTokenArtisan, productController.deleteAProduct);
app.get('/artisan/:id_artisan', productController.getAllProductsArtisan);
app.get('/:id_artisan/:id_prestation', productController.getPrestaProduct);
app.get('/:id_product', productController.getAProduct);

// Mock middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenArtisan: (req, res, next) => {
    req.artisan = { id: 1 };
    next();
  },
}));

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAProduct', () => {
    test('should create a new product', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Couture décousue' });
      Product.create.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .post('/')
        .send({
          price: 10,
          reparationType: 'Couture décousue',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Product créée avec succès.');
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/')
        .send({
          price: 100,
          reparationType: 'Couture décousue'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 404 if prestation not found', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/')
        .send({
          price: 100,
          reparationType: 'Couture décousue'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('La prestation n\'existe plus en base de donnés');
    });

    test('should handle errors gracefully', async () => {
      Artisan.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/')
        .send({
          price: 100,
          reparationType: 'Couture décousue'
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('updateAProduct', () => {
    test('should update a product', async () => {
      Product.findOne.mockResolvedValue({ id: 1, update: jest.fn() });
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .put('/1')
        .send({
          price: 150,
          id_prestation: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Product update avec succès.');
    });

    test('should return 404 if product not found', async () => {
      Product.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put('/1')
        .send({
          price: 150,
          id_prestation: 1
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produit non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Product.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/1')
        .send({
          price: 150,
          id_prestation: 1
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('deleteAProduct', () => {
    test('should delete a product', async () => {
      Product.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Product supprimé avec succès.');
    });

    test('should return 404 if product not found', async () => {
      Product.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Product non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Product.destroy.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAllProductsArtisan', () => {
    test('should get all products of a specific artisan', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Product.findAll.mockResolvedValue([{ id: 1, price: 100, id_artisan:1, id_prestation: 1 }]);

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toBe([{ id: 1, price: 10, id_artisan:1, id_prestation: 1 }]);
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 404 if no products found', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Product.findAll.mockResolvedValue(null);

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Auncun product trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Artisan.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getPrestaProduct', () => {
    test('should get a product linked to a specific prestation and artisan', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue({ id: 1, price: 100, id_artisan:1, id_prestation: 1 });

      const response = await request(app)
        .get('/1/1');

      expect(response.status).toBe(201);
      expect(response.body).toBe(100);
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 404 if prestation not found', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('La prestation n\'existe plus en base de donnés');
    });

    test('should return 404 if product not found', async () => {
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produit non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Artisan.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/1/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });

  describe('getAProduct', () => {
    test('should get a specific product by id', async () => {
      Product.findByPk.mockResolvedValue({ id: 1, price: 100, id_artisan: 1, id_prestation: 1 });
      Artisan.findOne.mockResolvedValue({ id: 1 });
      Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Couture décousue' });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.price).toBe(100);
      expect(response.body.reparationType).toBe('Couture décousue');
    });

    test('should return 404 if product not found', async () => {
      Product.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produit non trouvé.');
    });

    test('should handle errors gracefully', async () => {
      Product.findByPk.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Erreur lors du traitement des données.');
    });
  });
});
