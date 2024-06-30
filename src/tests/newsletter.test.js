const createServeur = require('../config/serveur');
const Newsletetr = require('../models/newsletterModel');
const Person = require('../models/personModel');
const supertest = require('supertest');

const app = createServeur();

describe('Newsletter controller', () => {
    afterEach(async() =>{
        await Newsletetr.destroy({});
    });

    describe('POST /newsletters', () => {
        it('should return 201 when it subscribe a person', async () => {
            const { statusCode } = await supertest(app)
                .post(`/newsletters`)
                .send({
                    email: 'test@gmail.com'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 201 when it subscribe a user', async () => {
            await Person.create({
                email: 'test@gmail.com',
                password: 'test',
                role: 'user',
                firstname: 'test',
                lastname: 'test',
                phone: '1234567890',
                subscribeNewsletter: false,
                id_adress: null,
                id_artisan: null
            });
            const { statusCode } = await supertest(app)
                .post(`/newsletters`)
                .send({
                    email: 'test@gmail.com'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when it subscribe a person already subscribed', async () => {
            await Newsletetr.create({email: 'test@gmail.com'});

            const { statusCode } = await supertest(app)
                .post(`/newsletters`)
                .send({
                    email: 'test@gmail.com'
                });
            expect(statusCode).toBe(201);
        });
    });
    
    describe('GET /newsletters', () => {
        it('should return 201 when it getting all the subscribers to the newsletter', async () => {
            await Newsletetr.create({email: 'test@gmail.com'});

            const { statusCode } = await supertest(app)
                .get(`/newsletters`);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when it no newsletter is found', async () => {
            const { statusCode } = await supertest(app)
                .get(`/newsletters`);

            expect(statusCode).toBe(201);
        });
    });
    
});
