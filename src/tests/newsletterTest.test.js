const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const newsletterController = require('../controllers/newsletterController.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.post('/newsletters', newsletterController.subscribe);
app.get('/newsletters', newsletterController.getAllSubscribers);

// Mock dependencies
jest.mock('../models/newsletterModel.js');

const Newsletter = require('../models/newsletterModel.js');

describe('Newsletter Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should subscribe to newsletter', async () => {
        Newsletter.findOne.mockResolvedValue(null);
        Newsletter.create.mockResolvedValue({ email: 'test@example.com' });

        const response = await request(app)
            .post('/newsletters')
            .send({
                email: 'test@example.com'
            });

        expect(response.status).toBe(201);
        expect(response.body.email).toBe('test@example.com');
    });

    test('should get all subscribers', async () => {
        Newsletter.findAll.mockResolvedValue([{ email: 'test@example.com' }]);

        const response = await request(app)
            .get('/newsletters');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
