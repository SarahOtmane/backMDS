const createServeur = require('../config/serveur');
const User = require('../models/userModel');
const { Op, where } = require('sequelize');
const supertest = require('supertest');

const app = createServeur();

describe('User Controller', () => {
    beforeEach(async() =>{
        await supertest(app)
            .post('/users/register')
            .send({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
                role: 'user',
                mobile: '0603285298',
                streetAddress: '23 Rue de Solférino',
                city: 'Boulogne Billancourt',
                postalCode: '92100',
                country: 'France',
            });
    });

    afterEach(async() =>{
        await User.destroy({where: {email : 'sarah@gmail.com'}});
        await User.destroy({where: {email : 'sarah22@gmail.com'}});
    })

    describe('POST /users/register', () => {
        it('should return 201 when registering a new user', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/register')
                .send({
                    firstname: 'Sarah2',
                    lastname: 'Otmane',
                    email: 'sarah22@gmail.com',
                    password: 'S@rah2024!',
                    role: 'user',
                    mobile: '0603285298',
                    streetAddress: '23 Rue de Solférino',
                    city: 'Boulogne Billancourt',
                    postalCode: '92100',
                    country: 'France',
                });
            expect(statusCode).toBe(201);
        });
    
        it('should return 409 if email already exists', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'sarah@gmail.com',
                    password: 'S@rah2024',
                    role: 'user',
                    mobile: '0603285298',
                    streetAddress: '23 Rue de Solférino',
                    city: 'Boulogne Billancourt',
                    postalCode: '92100',
                    country: 'France',
                });
            
            expect(statusCode).toBe(409);
            expect(body.message).toBe('Cet email existe déjà.');
        });
    
        it('should return 401 if trying to register as admin', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'sarah1@gmail.com',
                    password: 'S@rah2024',
                    role: 'admin',
                    mobile: '0603285298',
                    streetAddress: '23 Rue de Solférino',
                    city: 'Boulogne Billancourt',
                    postalCode: '92100',
                    country: 'France',
                });
            
            expect(statusCode).toBe(401);
            expect(body.message).toBe('Vous ne pouvez pas créer un utilisateur avec le rôle admin.');
        });
    });

    describe('POST /users/login', () => {
        it('should return 201 when loging a user', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'sarah@gmail.com',
                    password: 'S@rah2024',
                });
            expect(statusCode).toBe(201);
        });

        it('should return 404 when user not found', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'S@rah2024',
                });
            expect(statusCode).toBe(404);
        });

        it('should return 401 when password is incorrect', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'sarah@gmail.com',
                    password: 'S@rah2050',
                });
            expect(statusCode).toBe(401);
        });
    });

    describe('GET /users', () => {
        let token = '';

        beforeEach(async() =>{
            const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
            });

            token = tokenRes.body.token;
            console.log(token);
        })

        it('should return 200 when getting the informations', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/users')
                .set("authorization", token);

            expect(statusCode).toBe(200);
        });
    });

    describe('PUT /users', () => {
        let token = '';

        beforeEach(async() =>{
            const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
            });

            token = tokenRes.body.token;
            console.log(token);
        })

        it('should return 201 when updating the informations', async () => {
            const { statusCode, body } = await supertest(app)
                .put('/users')
                .set("authorization", token)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    mobile: '0603285200',
                    streetAddress: '26 Rue de Solférino',
                    city: 'Boulogne Billancourt',
                    postalCode: '92100',
                    country: 'France',
                    subscribeNewsletter: true,
                });

            expect(statusCode).toBe(201);
        });
    });

    describe('PUT /users/updatePassword', () => {
        let token = '';

        beforeEach(async() =>{
            const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
            });

            token = tokenRes.body.token;
            console.log(token);
        })

        it('should return 201 when updating the password', async () => {
            const { statusCode, body } = await supertest(app)
                .put('/users')
                .set("authorization", token)
                .send({
                    oldPassword : 'S@rah2024',
                    password : 'SARAHtest@2024',
                });

            expect(statusCode).toBe(201);
        });

        it('should return 400 when the old password is incorrect', async () => {
            const { statusCode, body } = await supertest(app)
                .put('/users')
                .set("authorization", token)
                .send({
                    oldPassword : 'SARAHtest@2024',
                    password : 'nbjhvhjvgg',
                });

            expect(statusCode).toBe(400);
        });
    });

    describe('DELETE /users', () => {
        let token = '';

        beforeEach(async() =>{
            const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
            });

            token = tokenRes.body.token;
            console.log(token);
        })

        it('should return 201 when deleting the user', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/users')
                .set("authorization", token);

            expect(statusCode).toBe(201);
        });
    });
    
    describe('Get /users/admin', () => {
        let token = '';

        beforeEach(async() =>{
            const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah2@admin.com',
                password: 'sarah2',
            });
            token = tokenRes.body.token;
            console.log(token);

            await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah@gmail.com',
                password: 'S@rah2024',
            });
        })

        it('should return 201 when getting all the users', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/users/admin')
                .set("authorization", token);

            expect(statusCode).toBe(201);
        });
    });
});


