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


const artisan= require('../controllers/artisanController'); 
app.post('/register', registerAnArtisan);

jest.mock('../models');
jest.mock('bcryptjs');
jest.mock('../middlewares/functionsMiddleware');

describe('POST /register', () => {
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
            .post('/register')
            .send(reqBody);

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Cet email existe déjà.');
    });

    test('should return 401 if job does not exist', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce(null);

        const res = await request(app)
            .post('/register')
            .send(reqBody);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Ce métier n\'existe pas');
    });

    test('should return 401 if email format is invalid', async () => {
        Artisan.findOne.mockResolvedValueOnce(null);
        Job.findOne.mockResolvedValueOnce({ name: 'Electrician', id: 1 });
        functionsMiddleware.verifyEmail.mockReturnValueOnce(false);

        const res = await request(app)
            .post('/register')
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
            .post('/register')
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
            .post('/register')
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
            .post('/register')
            .send(reqBody);

        expect(res.status).toBe(201);
        expect(res.body.newArtisan).toEqual(createdArtisan);
        expect(res.body.products.length).toBe(1);
    });

    test('should return 500 on server error', async () => {
        Artisan.findOne.mockRejectedValueOnce(new Error('Server error'));

        const res = await request(app)
            .post('/register')
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Erreur lors du traitement des données.');
    });
});
