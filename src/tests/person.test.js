const supertest = require('supertest');
const argon2 = require('argon2');
const Server = require('../services/serveur');
const Person = require('../models/personModel');
const Address = require('../models/adressModel');
const Job = require('../models/jobModel');
const Artisan = require('../models/artisanModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');

const app = new Server().app;

let dataPerson = {
    firstname: 'Sarah',
    lastname: 'Otmane',
    email: 'test@gmail.com',
    password: 'test',
    mobile: '0603285298',
    streetAddress: '23 rue de solférino',
    city: 'boulogne-billancourt',
    postalCode: '92100',
    country: 'France',
    siret: '123456789',
    tva: '123456789',
    job: 'testt',
    prestations: ['Test10', 'Test11']
}

let dataPresta = {
    reparationType: 'Test10',
    priceSuggested: 100,
    name_job: 'testt'
}

let dataPresta1 = {
    reparationType: 'Test11',
    priceSuggested: 100,
    name_job: 'testt'
}

let dataAddress = {
    streetAddress: '23 rue de solférino',
    city: 'boulogne-billancourt',
    postalCode: '92100',
    country: 'France'
}

let tokenUser;

describe('Person controller', () => {

    beforeEach(async () => {
        await Job.create({ name: 'testt' });
    });

    afterEach(async () => {
        await Person.destroy({ where: { email: 'test@gmail.com' } });
        await Address.destroy({ where: { postalCode: '92100' } });
        await Address.destroy({where: {streetAddress: '45 Rue de Rivoli'}});
        await Artisan.destroy({ where: { siret: '123456789', tva: '123456789' } });
        await Prestation.destroy({where: { priceSuggested: 100}});
        await Product.destroy({where: { price: 100}});
        await Job.destroy({ where: { name: 'testt' } });
    });

    describe('POST /persons/user/register', () => {
        it('should return 201 when a new user is registered without address', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'user'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when a new user is registered with address already existing in DB', async () => {
            await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    role: 'user'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when a new user is registered with address not in the DB', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    role: 'user'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 409 when the email already exists', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: 'test',
                mobile: '0603285298',
                subscribeNewsletter: false,
                role: 'user'
            });

            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298'
                });
            expect(statusCode).toBe(409);
        });

        it('should return 401 when the role is admin', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'admin'
                });
            expect(statusCode).toBe(401);
        });

        it('should return 401 when the role is artisan', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'artisan'
                });
            expect(statusCode).toBe(401);
        });

        it('should return 400 when required fields are missing', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    email: 'test@gmail.com',
                    password: 'test',
                });
            expect(statusCode).toBe(400);
        });

        it('should return 400 when email format is invalid', async () => {
            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'invalid-email',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'user'
                });
            expect(statusCode).toBe(400);
        });
    });

    describe('POST /persons/artisan/register', () => {
        beforeEach(async () => {
            await Prestation.create(dataPresta);
            await Prestation.create(dataPresta1);
        });

        afterEach(async () => {
            await Prestation.destroy({ where: { name_job: 'testt' } });
        });

        it('should return 201 when a new artisan is registered with address already in DB', async () => {
            await Address.create(dataAddress);

            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send(dataPerson);

            expect(response.statusCode).toBe(201);
        });

        it('should return 201 when a new artisan is registered with address not in DB', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'testt',
                    prestations: ['Test10', 'Test11']
                });

            expect(response.statusCode).toBe(201);
        });

        it('should return 409 when the email already exists', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: 'test',
                mobile: '0603285298',
                subscribeNewsletter: false,
                role: 'artisan',
                id_address: null,
                id_artisan: null
            });

            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'testt',
                    prestations: ['Test10', 'Test11']
                });

            expect(response.statusCode).toBe(409);
        });

        it('should return 401 when the role is admin', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'admin',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'testt',
                    prestations: ['Test10', 'Test11']
                });

            expect(response.statusCode).toBe(401);
        });

        it('should return 401 when the role is user', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    role: 'user',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'testt',
                    prestations: ['Test10', 'Test11']
                });

            expect(response.statusCode).toBe(401);
        });

        it('should return 400 when required fields are missing', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    email: 'test@gmail.com',
                    password: 'test'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 401 when job does not exist', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'nonexistentjob',
                    prestations: ['Test10']
                });

            expect(response.statusCode).toBe(401);
        });

        it('should return 404 when prestations do not exist', async () => {
            const response = await supertest(app)
                .post('/persons/artisan/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France',
                    siret: '123456789',
                    tva: '123456789',
                    job: 'testt',
                    prestations: ['NonexistentPresta']
                });

            expect(response.statusCode).toBe(404);
        });
    });

    describe('POST /persons/login', () => {
        it('should return 404 when the person is not found', async () => {
            const response = await supertest(app)
                .post('/persons/login')
                .send({
                    email: 'test2@gmail.com',
                    password: 'test',
                });

            expect(response.statusCode).toBe(404);
        });

        it('should return 401 when the password is not correct', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const response = await supertest(app)
                .post('/persons/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'tryit',
                });

            expect(response.statusCode).toBe(401);
        });

        it('should return 200 when the person is logued', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const response = await supertest(app)
                .post('/persons/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'test',
                });

            expect(response.statusCode).toBe(200);
        });
    });

    describe('GET /persons/user', () => {
        it('should return 200 when getting details of user without address', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;

            const response = await supertest(app)
                .get('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when getting details of user with address', async () => {
            const address = await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: address.id,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;

            const response = await supertest(app)
                .get('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(response.statusCode).toBe(200);
        });
    });

    describe('PUT /persons/user', () => {
        beforeEach(async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;
        });

        it('should return 200 when updating user details without changing the address', async () => {
            const response = await supertest(app)
                .put('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678'
                });

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when updating user details with an existing address', async () => {
            const address = await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            const response = await supertest(app)
                .put('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France'
                });

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when updating user details with a new address', async () => {
            const response = await supertest(app)
                .put('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678',
                    streetAddress: '45 rue de Rivoli',
                    city: 'Paris',
                    postalCode: '75001',
                    country: 'France'
                });

            expect(response.statusCode).toBe(200);
        });

        it('should return 400 when required fields are missing', async () => {
            const response = await supertest(app)
                .put('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    lastname: 'Updated'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 200 when updating user details with partial address information', async () => {
            const response = await supertest(app)
                .put('/persons/user')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt'
                });

            expect(response.statusCode).toBe(200);
        });
    });

    describe('PUT /persons/user/password', () => {
        beforeEach(async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'user',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;
        });

        it('should return 201 when the password is updated successfully', async () => {
            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(201);
        });

        it('should return 400 when the old password is incorrect', async () => {
            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'wrongpassword',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 404 when the user is not found', async () => {
            await Person.destroy({ where: { email: 'test@gmail.com' } });

            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(404);
        });

        it('should return 400 when oldPassword is missing', async () => {
            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 when new password is missing', async () => {
            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 when old and new passwords are the same', async () => {
            const response = await supertest(app)
                .put('/persons/user/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'test'
                });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('GET /persons/artisan', () => {
        it('should return 200 when getting details of artisan without address', async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'artisan',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;

            const response = await supertest(app)
                .get('/persons/artisan')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when getting details of artisan with address', async () => {
            const address = await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'artisan',
                subscribeNewsletter: false,
                id_address: address.id,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;

            const response = await supertest(app)
                .get('/persons/artisan')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(response.statusCode).toBe(200);
        });
    });

    describe('PUT /persons/artisan', () => {
        beforeEach(async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'artisan',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;
        });

        it('should return 200 when updating artisan details without changing the address', async () => {
            const response = await supertest(app)
                .put('/persons/artisan')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678'
                });

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when updating artisan details with an existing address', async () => {
            const address = await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            const response = await supertest(app)
                .put('/persons/artisan')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678',
                    streetAddress: '23 rue de solférino',
                    city: 'boulogne-billancourt',
                    postalCode: '92100',
                    country: 'France'
                });

            expect(response.statusCode).toBe(200);
        });

        it('should return 200 when updating artisan details with a new address', async () => {
            const response = await supertest(app)
                .put('/persons/artisan')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    firstname: 'Sarah',
                    lastname: 'Updated',
                    mobile: '0612345678',
                    streetAddress: '45 rue de Rivoli',
                    city: 'Paris',
                    postalCode: '75001',
                    country: 'France'
                });

            expect(response.statusCode).toBe(200);
        });
    });

    describe('PUT /persons/artisan/password', () => {
        beforeEach(async () => {
            await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@gmail.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'artisan',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: null
            });

            const responseToken = await supertest(app).post('/persons/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });
            tokenUser = responseToken.body.token;
        });

        it('should return 201 when the password is updated successfully', async () => {
            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(201);
        });

        it('should return 400 when the old password is incorrect', async () => {
            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'wrongpassword',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 404 when the artisan is not found', async () => {
            await Person.destroy({ where: { email: 'test@gmail.com' } });

            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(404);
        });

        it('should return 400 when oldPassword is missing', async () => {
            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    password: 'newpassword'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 when new password is missing', async () => {
            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 when old and new passwords are the same', async () => {
            const response = await supertest(app)
                .put('/persons/artisan/password')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    oldPassword: 'test',
                    password: 'test'
                });

            expect(response.statusCode).toBe(400);
        });
    });
});
