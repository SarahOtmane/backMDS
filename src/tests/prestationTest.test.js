const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const prestationController = require('../controllers/prestationController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.get('/prestations', prestationController.getAllPrestations);
app.get('/prestations/:id_prestation', prestationController.getPrestationById);
app.get('/prestations/job/:id_job', prestationController.getPrestationsByJob);
app.post('/prestations', prestationController.createPrestation);
app.put('/prestations/:id_prestation', prestationController.updatePrestation);
app.delete('/prestations/:id_prestation', prestationController.deletePrestation);

// Mock dependencies
jest.mock('../models/prestationModel.js');

const Prestation = require('../models/prestationModel.js');

describe('Prestation Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all prestations', async () => {
        Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Type 1' }]);

        const response = await request(app)
            .get('/prestations');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get prestation by id', async () => {
        Prestation.findOne.mockResolvedValue({ id: 1, reparationType: 'Type 1' });

        const response = await request(app)
            .get('/prestations/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should get prestations by job', async () => {
        Prestation.findAll.mockResolvedValue([{ id: 1, reparationType: 'Type 1' }]);

        const response = await request(app)
            .get('/prestations/job/1');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should create a prestation', async () => {
        Prestation.create.mockResolvedValue({ id: 1, reparationType: 'Type 1' });

        const response = await request(app)
            .post('/prestations')
            .send({
                reparationType: 'Type 1',
                priceSuggested: 100,
                id_job: 1
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should update a prestation', async () => {
        Prestation.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/prestations/1')
            .send({
                reparationType: 'Updated Type',
                priceSuggested: 150,
                id_job: 1
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Prestation updated successfully.');
    });

    test('should delete a prestation', async () => {
        Prestation.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/prestations/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Prestation deleted successfully.');
    });
});
