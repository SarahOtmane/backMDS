const createServeur = require('../services/serveur');

const Person = require('../models/personModel');
const Address = require('../models/adressModel');
const Job = require('../models/jobModel');
const Artisan = require('../models/artisanModel');

const supertest = require('supertest');

const app = createServeur();

describe('Person controller ', () => {
    
    beforeAll(async () => {
        await Job.create({ name: 'Couture' });
    });

    afterEach(async () => {
        await Person.destroy({ where: { email: 'test@gmail.com' } });
        await Address.destroy({ where: { postalCode: '92100' } });
        await Job.destroy({ where: { name: 'Couture' } });
        await Artisan.destroy({ where: { siret: '123456789', tva: '123456789' } });
    });

    afterAll(async () => {
        await Job.destroy({ where: { name: 'Couture' } });
    });

    describe('POST /persons', () => {
        it('should return 201 when a new user is registred without adress', async() => {

            const { statusCode } = await supertest(app)
                .post('/persons/user/register')
                .send({
                    firstname: 'Sarah',
                    lastname: 'Otmane',
                    email: 'test@gmail.com',
                    password: 'test',
                    mobile: '0603285298'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when a new user is registred with adress already exist in bdd', async() => {
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
                    country: 'France'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when a new user is registred with adress which is not in the bdd', async() => {

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
                    country: 'France'
                });
            expect(statusCode).toBe(201);
        });
        
        it('should return 409 when the email already exist', async() => {
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

        it('should return 409 when the role is artisan', async() => {

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

    describe('POST /persons', () => {

        it('should return 201 when a new artisan is registred with adress already in bdd', async() => {
            await Job.create({name: 'Couture'});

            const { statusCode } = await supertest(app)
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
                    name_job: 'Couture',
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when a new artisan is registred with adress already exist in bdd', async() => {
            await Address.create({
                streetAddress: '23 rue de solférino',
                city: 'boulogne-billancourt',
                postalCode: '92100',
                country: 'France'
            });

            await Job.create({name: 'Couture'});
    
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
                    siret: '123456789',
                    tva: '123456789',
                    name_job: 'Couture',
                });
            expect(statusCode).toBe(201);
        });
    });

});
