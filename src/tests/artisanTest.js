const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const artisanController = require('../controllers/artisanController');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.post('/artisans/register', artisanController.registerAnArtisan);
app.post('/artisans/login', artisanController.loginAnArtisan);
app.get('/artisans', artisanController.getAnArtisan);
app.put('/artisans', artisanController.putAnArtisan);
app.delete('/artisans', artisanController.deleteAnArtisan);
app.get('/artisans/all', artisanController.getAllArtisans);
app.get('/artisans/filter/:id_job/:postalcode', artisanController.getAllArtisansFiltre);

// Mock middleware
app.use((req, res, next) => {
    req.user = { id: 1 };
    next();
});

// Mock dependencies
jest.mock('../models/artisanModel.js');
jest.mock('../models/jobModel.js');
jest.mock('../models/prestationModel.js');
jest.mock('../models/productModel.js');
jest.mock('../middlewares/functionsMiddleware.js');

const Artisan = require('../models/artisanModel.js');
const Job = require('../models/jobModel.js');
const Prestation = require('../models/prestationModel.js');
const Product = require('../models/productModel.js');
const functionsMiddleware = require('../middlewares/functionsMiddleware.js');

describe('Artisan Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should register an artisan', async () => {
        Artisan.findOne.mockResolvedValue(null);
        Job.findOne.mockResolvedValue({ id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValue(true);
        Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'type', priceSuggested: 100 });
        Artisan.create.mockResolvedValue({ id: 1 });
        Product.create.mockResolvedValue({});

        const response = await request(app)
            .post('/artisans/register')
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

    test('should login an artisan', async () => {
        const artisan = { id: 1, email: 'johndoe@example.com', password: 'password123' };
        Artisan.findOne.mockResolvedValue(artisan);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue('fakeToken');

        const response = await request(app)
            .post('/artisans/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body.token).toBe('fakeToken');
    });

    test('should get an artisan', async () => {
        Artisan.findOne.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .get('/artisans')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should update an artisan', async () => {
        Artisan.findOne.mockResolvedValue({ id: 1, update: jest.fn() });
        Job.findOne.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .put('/artisans')
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

    test('should delete an artisan', async () => {
        Artisan.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/artisans')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Artisan supprimé avec succès.');
    });

    test('should get all artisans', async () => {
        Artisan.findAll.mockResolvedValue([{ id: 1 }]);

        const response = await request(app)
            .get('/artisans/all')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(201);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should filter artisans', async () => {
        Artisan.findAll.mockResolvedValue([{ id: 1 }]);

        const response = await request(app)
            .get('/artisans/filter/1/12345')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(201);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
