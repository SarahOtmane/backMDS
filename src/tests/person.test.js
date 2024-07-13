const Server = require('../services/serveur');
const Person = require('../models/personModel');
const Address = require('../models/adressModel');
const Job = require('../models/jobModel');
const Artisan = require('../models/artisanModel');
const supertest = require('supertest');

const app = new Server().app;

describe('Person controller', () => {

    beforeEach(async () => {
        await Job.create({ name: 'testt' });
    });

    afterEach(async () => {
        await Person.destroy({ where: { email: 'test@gmail.com' } });
        await Address.destroy({ where: { postalCode: '92100' } });
        await Artisan.destroy({ where: { siret: '123456789', tva: '123456789' } });
        await Job.destroy({ where: { name: 'testt' } });
    });

    describe('POST /persons/user/register', () => {
        it('should return 201 when a new user is registered without address', async() => {
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

        it('should return 201 when a new user is registered with address already existing in DB', async() => {
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

        it('should return 201 when a new user is registered with address not in the DB', async() => {
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
        
        it('should return 409 when the email already exists', async() => {
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

        it('should return 401 when the role is admin', async() => {
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

        it('should return 401 when the role is artisan', async() => {
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
    });

    describe('POST /persons/artisan/register', () => {
        beforeEach(async() =>{

        })

        it('should return 201 when a new artisan is registered with address already in DB', async() => {
            await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
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
                    prestations: ['Reparation', 'Confection']
                });

            console.log(response.body);
            expect(response.statusCode).toBe(201);
        });

        it('should return 201 when a new artisan is registered with address not in DB', async() => {
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
                    prestations: ['Reparation', 'Confection']
                });

            console.log(response.body);
            expect(response.statusCode).toBe(201);
        });

        it('should return 409 when the email already exists', async() => {
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
                    prestations: ['Reparation', 'Confection']
                });

            console.log(response.body);
            expect(response.statusCode).toBe(409);
        });

        it('should return 401 when the role is admin', async() => {
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
                    prestations: ['Reparation', 'Confection']
                });

            console.log(response.body);
            expect(response.statusCode).toBe(401);
        });

        it('should return 401 when the role is user', async() => {
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
                    prestations: ['Reparation', 'Confection']
                });

            console.log(response.body);
            expect(response.statusCode).toBe(401);
        });
    });
});
