const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController.js');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.post('/users/register', userController.register);
app.post('/users/login', userController.login);
app.get('/users', userController.getUser);
app.put('/users', userController.updateUser);
app.delete('/users', userController.deleteUser);

// Mock middleware
app.use((req, res, next) => {
    req.user = { id: 1 };
    next();
});

// Mock dependencies
jest.mock('../models/userModel.js');
jest.mock('../middlewares/jwtMiddleware.js');

const User = require('../models/userModel.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should register a user', async () => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .post('/users/register')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                country: 'Country',
                postalCode: '12345'
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should login a user', async () => {
        const user = { id: 1, email: 'johndoe@example.com', password: 'password123' };
        User.findOne.mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue('fakeToken');

        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBe('fakeToken');
    });

    test('should get a user', async () => {
        User.findOne.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should update a user', async () => {
        User.findOne.mockResolvedValue({ id: 1, update: jest.fn() });

        const response = await request(app)
            .put('/users')
            .send({
                lastname: 'Doe',
                firstname: 'John',
                password: 'newpassword',
                mobile: '1234567890',
                streetAdress: '123 Street',
                city: 'City',
                country: 'Country',
                postalCode: '12345'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User updated successfully.');
    });

    test('should delete a user', async () => {
        User.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer fakeToken`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully.');
    });
});
