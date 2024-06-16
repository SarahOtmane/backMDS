const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.post('/products', productController.createProduct);
app.get('/products/artisan/:id_artisan', productController.getProductsByArtisan);
app.get('/products/:id_product', productController.getProductById);
app.put('/products/:id_product', productController.updateProduct);
app.delete('/products/:id_product', productController.deleteProduct);

// Mock dependencies
jest.mock('../models/productModel.js');

const Product = require('../models/productModel.js');

describe('Product Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a product', async () => {
        Product.create.mockResolvedValue({ id: 1, price: 100 });

        const response = await request(app)
            .post('/products')
            .send({
                price: 100,
                reparationType: 'Type 1'
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should get products by artisan', async () => {
        Product.findAll.mockResolvedValue([{ id: 1, price: 100 }]);

        const response = await request(app)
            .get('/products/artisan/1');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get product by id', async () => {
        Product.findOne.mockResolvedValue({ id: 1, price: 100 });

        const response = await request(app)
            .get('/products/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should update a product', async () => {
        Product.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/products/1')
            .send({
                price: 150,
                id_prestation: 1
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product updated successfully.');
    });

    test('should delete a product', async () => {
        Product.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/products/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product deleted successfully.');
    });
});
