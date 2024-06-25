const { Model } = require('sequelize');
const jwt = require('jsonwebtoken'); 

Model.belongsTo = jest.fn();
Model.hasMany = jest.fn();

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../middlewares/functionsMiddleware');
jest.mock('../models/artisanModel');
jest.mock('../models/jobModel');
jest.mock('../models/prestationModel');
jest.mock('../models/productModel');

const request = require('supertest');
const express = require('express');
const bcryptjs = require('bcryptjs');
const functionsMiddleware = require('../middlewares/functionsMiddleware');

const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');

const app = express();
app.use(express.json());

const artisanController = require('../controllers/artisanController');
app.post('/artisans/register', artisanController.registerAnArtisan);
app.post('/artisans/login', artisanController.loginAnArtisan)

describe('POST /artisans/register', () => {
    let reqBody;

    beforeEach(() => {
        reqBody = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            mobile: '1234567890',
            streetAdress: '123 Main St',
            city: 'Sample City',
            postalCode: '12345',
            country: 'Sample Country',
            job: 'Electrician',
            prestations: ['Prestation1', 'Prestation2'],
            siret: '12345678901234',
            numeroTVA: 'FR12345678901'
        };
    });

    test('should return 409 if email already exists', async () => {
        Artisan.findOne.mockResolvedValueOnce({ email: 'john.doe@example.com' });

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Cet email existe déjà.');
    });

    test('should return 401 if job does not exist', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce(null);

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Ce métier n\'existe pas');
    });

    test('should return 401 if email format is invalid', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce({ name: 'Electrician', id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValueOnce(false);

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('L\'email n\'est pas au bon format');
    });

    test('should return 404 if no prestations provided', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce({ name: 'Electrician', id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValueOnce(true);

        reqBody.prestations = [];

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Aucune prestation enregistrée');
    });

    test('should return 404 if a prestation does not exist', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce({ name: 'Electrician', id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValueOnce(true);
        Prestation.findOne.mockResolvedValueOnce(null);

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('La prestation Prestation1 n\'existe pas');
    });

    test('should return 201 and create artisan if all data is valid', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce({ name: 'Electrician', id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValueOnce(true);
        bcryptjs.hash.mockResolvedValueOnce('hashedpassword');
        Prestation.findOne.mockResolvedValue({ reparationType: 'Prestation1', id: 1, priceSuggested: 100 });

        const createdArtisan = {
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'hashedpassword',
            mobile: '1234567890',
            streetAdress: '123 Main St',
            city: 'Sample City',
            postalCode: '12345',
            country: 'Sample Country',
            acceptNewOrder: true,
            id_job: 1,
            siret: '12345678901234',
            numeroTVA: 'FR12345678901'
        };
        Artisan.create.mockResolvedValueOnce(createdArtisan);
        Product.create.mockResolvedValueOnce({ price: 100, id_prestation: 1, id_artisan: 1 });

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(201);
        expect(res.body.newArtisan).toEqual(createdArtisan);
    });

    test('should return 500 on server error', async () => {
        Artisan.findOne.mockRejectedValueOnce(new Error('Server error'));

        const res = await request(app)
            .post('/artisans/register')
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Erreur lors du traitement des données.');
    });
});

describe('POST /artisans/login', () => {
    let reqBody;

    beforeEach(() => {
        reqBody = {
            email: 'john.doe@example.com',
            password: 'password123'
        };
    });

    test('should return 404 if artisan not found', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);

        const res = await request(app)
            .post('/artisans/login')
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Artisan non trouvé.');
    });

    test('should return 401 if password is incorrect', async () => {
        const artisan = {
            id: 1,
            email: 'john.doe@example.com',
            password: 'hashedpassword'
        };
        Artisan.findOne.mockResolvedValueOnce(artisan);
        bcryptjs.compare.mockResolvedValueOnce(false);

        const res = await request(app)
            .post('/artisans/login')
            .send(reqBody);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Email ou mot de passe incorrect.');
    });

    test('should return 201 and a token if login is successful', async () => {
        const artisan = {
            id: 1,
            email: 'john.doe@example.com',
            password: 'hashedpassword'
        };
        Artisan.findOne.mockResolvedValueOnce(artisan);
        bcryptjs.compare.mockResolvedValueOnce(true);
        const token = 'jsonwebtoken';
        jwt.sign.mockReturnValueOnce(token);

        const res = await request(app)
            .post('/artisans/login')
            .send(reqBody);

        expect(res.status).toBe(201);
        expect(res.body.token).toBe(token);
    });

    test('should return 500 on server error', async () => {
        Artisan.findOne.mockRejectedValueOnce(new Error('Server error'));

        const res = await request(app)
            .post('/artisans/login')
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Erreur lors du traitement des données.');
    });
});
