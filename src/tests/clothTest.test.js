const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const clothController = require('../controllers/artisanController.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.get('/clothes', clothController.getAllClothes);
app.get('/clothes/:id_cloth', clothController.getClothById);
app.post('/clothes', clothController.createCloth);
app.put('/clothes/:id_cloth', clothController.updateCloth);
app.delete('/clothes/:id_cloth', clothController.deleteCloth);

// Mock dependencies
jest.mock('../models/clothModel.js');

const Cloth = require('../models/clothModel.js');

describe('Cloth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all clothes', async () => {
        Cloth.findAll.mockResolvedValue([{ id: 1, categorie: 'Categorie 1', clothType: 'Type 1' }]);

        const response = await request(app)
            .get('/clothes');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get cloth by id', async () => {
        Cloth.findOne.mockResolvedValue({ id: 1, categorie: 'Categorie 1', clothType: 'Type 1' });

        const response = await request(app)
            .get('/clothes/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should create a cloth', async () => {
        Cloth.create.mockResolvedValue({ id: 1, categorie: 'Categorie 1', clothType: 'Type 1' });

        const response = await request(app)
            .post('/clothes')
            .send({
                categorie: 'Categorie 1',
                clothType: 'Type 1',
                id_job: 1
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should update a cloth', async () => {
        Cloth.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/clothes/1')
            .send({
                categorie: 'Updated Categorie',
                clothType: 'Updated Type',
                id_job: 1
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Cloth updated successfully.');
    });

    test('should delete a cloth', async () => {
        Cloth.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/clothes/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Cloth deleted successfully.');
    });
});
