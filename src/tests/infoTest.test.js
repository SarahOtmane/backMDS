const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const infoController = require('../controllers/infoController.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.get('/infos', infoController.getAllInfo);
app.get('/infos/:id_info', infoController.getInfoById);
app.post('/infos', infoController.createAnInfo);
app.put('/infos/:id_info', infoController.updateInfo);
app.delete('/infos/:id_info', infoController.deleteAnInfo);

// Mock dependencies
jest.mock('../models/infoModel.js');

const Info = require('../models/infoModel.js');

describe('Info Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all infos', async () => {
        Info.findAll.mockResolvedValue([{ id: 1, name: 'Info 1', content: 'Content 1' }]);

        const response = await request(app)
            .get('/infos');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get info by id', async () => {
        Info.findOne.mockResolvedValue({ id: 1, name: 'Info 1', content: 'Content 1' });

        const response = await request(app)
            .get('/infos/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should create an info', async () => {
        Info.create.mockResolvedValue({ id: 1, name: 'Info 1', content: 'Content 1' });

        const response = await request(app)
            .post('/infos')
            .send({
                name: 'Info 1',
                content: 'Content 1'
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should update an info', async () => {
        Info.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/infos/1')
            .send({
                name: 'Updated Info',
                content: 'Updated Content'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Info updated successfully.');
    });

    test('should delete an info', async () => {
        Info.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/infos/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Info deleted successfully.');
    });
});
