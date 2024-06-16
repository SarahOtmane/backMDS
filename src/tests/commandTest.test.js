const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const commandController = require('../controllers/commandController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.post('/commands/:id_artisan', commandController.createCommand);
app.get('/commands/artisans', commandController.getCommandsForArtisan);
app.get('/commands/users', commandController.getCommandsForUser);
app.get('/commands', commandController.getAllCommands);
app.put('/commands/:id_command', commandController.updateCommand);

// Mock dependencies
jest.mock('../models/commandModel.js');

const Command = require('../models/commandModel.js');

describe('Command Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a command', async () => {
        Command.create.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .post('/commands/1')
            .send({
                name: 'Command 1',
                picture: 'pic.jpg',
                categorie: 'Categorie 1',
                clothType: 'Type 1',
                id_job: 1,
                reparationType: 'Type 1',
                comment: 'Test comment'
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should get commands for an artisan', async () => {
        Command.findAll.mockResolvedValue([{ id: 1 }]);

        const response = await request(app)
            .get('/commands/artisans');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get commands for a user', async () => {
        Command.findAll.mockResolvedValue([{ id: 1 }]);

        const response = await request(app)
            .get('/commands/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get all commands', async () => {
        Command.findAll.mockResolvedValue([{ id: 1 }]);

        const response = await request(app)
            .get('/commands');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should update a command', async () => {
        Command.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/commands/1')
            .send({
                name: 'Updated Command',
                picture: 'updated_pic.jpg',
                categorie: 'Updated Categorie',
                clothType: 'Updated Type',
                id_job: 1,
                reparationType: 'Updated Type',
                comment: 'Updated comment'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Command updated successfully.');
    });
});
