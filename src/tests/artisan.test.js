
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const artisanController = require('../controllers/artisanController'); 


const app = express();
app.use(bodyParser.json());
app.post('/register', artisanController.registerAnArtisan);

describe('POST /register', () => {
    it('should return 409 if email already exists', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'existing@example.com',
                job: 'Some Job',
                prestations: ['Prestation1'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Cet email existe déjà.');
    });

    it('should return 401 if job does not exist', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'newemail@example.com',
                job: 'NonExistingJob',
                prestations: ['Prestation1'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Ce métier n\'existe pas');
    });

    it('should return 401 if email format is invalid', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'invalid-email',
                job: 'Some Job',
                prestations: ['Prestation1'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('L\'email n\'est pas au bon format');
    });

    it('should return 404 if no prestations are provided', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'newemail@example.com',
                job: 'Some Job',
                prestations: [],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Aucune prestation enregistrée');
    });

    it('should return 201 and create a new artisan if all validations pass', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'newemail@example.com',
                job: 'Some Job',
                prestations: ['Prestation1'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(201);
        expect(res.body.newArtisan).toBeDefined();
        expect(res.body.products).toBeDefined();
    });

    it('should return 404 if a prestation does not exist', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'newemail@example.com',
                job: 'Some Job',
                prestations: ['NonExistingPrestation'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('La prestation NonExistingPrestation n\'existe pas');
    });

    it('should return 500 if there is a server error', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'servererror@example.com',
                job: 'Some Job',
                prestations: ['Prestation1'],
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                postalCode: '12345',
                country: 'Country',
                siret: '12345678901234',
                numeroTVA: 'FR12345678901'
            });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Erreur lors du traitement des données.');
    });
});
