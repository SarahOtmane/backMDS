const Server = require('../services/serveur');
const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Person = require('../models/personModel');
const Address = require('../models/adressModel');
const supertest = require('supertest');

const app = new Server().app;


describe('Artisan controller', () => {
    beforeEach(async() =>{
        await Job.create({name: 'Test'});
    })

    afterEach(async() =>{
        await Job.destroy({where: {name: 'Test'}});
        await Artisan.destroy({where: {siret: '123456789'}});
        await Person.destroy({where: {email: 'test@gmail.com'}});
        await Address.destroy({where: {streetAddress: '23 test'}});
    })

    describe('GET /artisans/:id_artisan', () => {
        it('should return 200 when getting an artisan with his id', async() => {
            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : 'Test'
            });
    
            const { statusCode } = await supertest(app)
                .get(`/artisans/${artisan.id}`)
    
            expect(statusCode).toBe(200);
        });
    
        it('should return 404 when no artisan is not found', async() => {
            const { statusCode } = await supertest(app)
                .get(`/artisans/999`)
    
            expect(statusCode).toBe(404);
        });
    });


    describe('GET /artisans/:name_job/:postalcode', () => {
        it('should return 200 when getting artisan with postal code and name job', async() => {
            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : 'Test'
            });

            const address = await Address.create({
                streetAddress: '23 test',
                city: 'TEST',
                postalCode: '92100',
                country: 'France'
            });

            await Person.create({
                firstName: 'test',
                lastName: 'test',
                email: 'test@gmail.com',
                password: 'test',
                role: 'user',
                phone: '0123456789',
                subscribeNewsletter: false,
                id_address: address.id,
                id_artisan: artisan.id
            });

            const { statusCode } = await supertest(app)
                .get(`/artisans/${artisan.name_job}/${address.postalCode}`);

            expect(statusCode).toBe(200);
        });

        it('should return 200 when getting artisan with only name job', async() => {
            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : 'Test'
            });

            await Person.create({
                firstName: 'test',
                lastName: 'test',
                email: 'test@gmail.com',
                password: 'test',
                role: 'user',
                phone: '0123456789',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: artisan.id
            });

            const { statusCode } = await supertest(app)
                .get(`/artisans/${artisan.name_job}/-1`);

            expect(statusCode).toBe(200);
        });

        it('should return 400 when no job is send', async() => {

            const { statusCode } = await supertest(app)
                .get(`/artisans/    /-1`);

            expect(statusCode).toBe(400);
        });

        it('should return 404 when the job is not found', async() => {

            const { statusCode } = await supertest(app)
                .get(`/artisans/sarah/-1`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when the postal given is not found', async() => {

            const { statusCode } = await supertest(app)
                .get(`/artisans/Test/12000`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when no person is found', async() => {
            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : 'Test'
            });

            const address = await Address.create({
                streetAddress: '23 test',
                city: 'TEST',
                postalCode: '92100',
                country: 'France'
            });

            const { statusCode } = await supertest(app)
                .get(`/artisans/${artisan.name_job}/${address.id}`);

            expect(statusCode).toBe(404);
        });
        
    });
    
    
});
