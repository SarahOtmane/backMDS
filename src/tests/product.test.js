const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Person = require('../models/personModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');
const Server = require('../services/serveur');
const supertest = require('supertest');
const argon2 = require('argon2');

const app = new Server().app;

let dataArtisan = {
    acceptNewOrder: 1,
    siret: '123456789',
    tva: 'FR123456789',
    description: 'test',
    picture: 'test',
    name_job: 'Test'
};

let dataPrestation = {
    reparationType: 'testNettoyer',
    priceSuggested: 100,
    name_job: 'Test'
};

let dataPerson;
let token;

describe('Product controller', () => {
    beforeAll(async () => {
        await require('../services/connectBdd').connect();
        await require('../services/tablesBdd').createTablesInOrder();

        dataPerson = {
            firstname: 'Sarah',
            lastname: 'Otmane',
            email: 'test@artisan.com',
            password: await argon2.hash('test'),
            mobile: '0603285298',
            role: 'artisan',
            subscribeNewsletter: false,
            id_address: null,
            id_artisan: null
        };

        const response = await supertest(app)
            .post('/persons/login')
            .send({
                email: 'otmanesarah02@gmail.com',
                password: 'SARAHtest@2024'
            });

        token = response.body.token;
    });

    afterEach(async () => {
        await Product.destroy({ where: { price: 100 } });
        await Artisan.destroy({ where: { siret: '123456789' } });
        await Prestation.destroy({ where: { name_job: 'Test' } });
        await Prestation.destroy({ where: { reparationType: 'testNettoyer3' } });
        await Job.destroy({ where: { name: 'Test' } });
        await Person.destroy({ where: { email: 'test@artisan.com' } });
    });

    describe('GET /products/:id_artisan/:id_prestation', () => {
        it('should return 404 if no artisan is found', async () => {
            const { statusCode } = await supertest(app)
                .get('/products/9999/9999');

            expect(statusCode).toBe(404);
        });

        it('should return 404 if no prestation is found', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode } = await supertest(app)
                .get(`/products/${artisan.id}/9999`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if no product is found', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .get(`/products/${artisan.id}/${presta.id}`);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when getting a product', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .get(`/products/${artisan.id}/${presta.id}`);

            expect(statusCode).toBe(201);
        });
    });

    describe('GET /products/:id_product', () => {
        it('should return 404 if no product is found', async () => {
            const { statusCode } = await supertest(app)
                .get('/products/9999');

            expect(statusCode).toBe(404);
        });

        it('should return 404 when no artisan is found', async () => {
            const product = await Product.create({
                id_artisan: null,
                id_prestation: null,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when no presta is found', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const product = await Product.create({
                id_artisan: artisan.id,
                id_prestation: null,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when getting a product', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            const product = await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(201);
        });

    });

    describe('GET /products/artisan/:id_artisan', () => {
        it('should return 404 if no artisan is found', async () => {
            const { statusCode } = await supertest(app)
                .get('/products/artisan/9999')
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if no presta is found', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode } = await supertest(app)
                .get(`/products/artisan/${artisan.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when getting all products of an artisan', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .get(`/products/artisan/${artisan.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(201);
        });
    });

    describe('POST /products/artisan/:id_artisan', () => {
        it('should return 404 if the artisan is not found', async () => {
            const { statusCode } = await supertest(app)
                .post('/products/artisan/9999')
                .send({
                    reparationType: 'testNettoyer',
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if the prestation is not found', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode } = await supertest(app)
                .post(`/products/artisan/${artisan.id}`)
                .send({
                    reparationType: 'testNettoyer',
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when creating a product', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .post(`/products/artisan/${artisan.id}`)
                .send({
                    reparationType: 'testNettoyer',
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(201);
        });
    });

    describe('PUT /products/:id_product', () => {
        it('should return 404 if the product is not found', async () => {
            const { statusCode } = await supertest(app)
                .put('/products/9999')
                .send({
                    reparationType: 'testNettoyer',
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if the artisan is not found', async () => {
            await Job.create({ name: 'Test' });
            await Person.create(dataPerson);
            const product = await Product.create({
                id_prestation: null,
                id_artisan: null,
                price: 100
            });

            const response = await supertest(app)
                .post('/persons/login')
                .send({
                    email: 'test@artisan.com',
                    password: 'test'
                });

            let tokenArtisan = response.body.token;

            const { statusCode } = await supertest(app)
                .put(`/products/${product.id}`)
                .send({
                    reparationType: 'testNettoyer',
                    price: 100
                })
                .set('Authorization', 'Bearer ' + tokenArtisan);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if the prestation is not found', async() => {
            const product = await Product.create({
                id_prestation: null,
                id_artisan: null,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .put(`/products/${product.id}`)
                .send({
                    id_prestation: 999,
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });
        
        it('should return 201 when updating a product', async() => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description: 'test',
                picture: 'test',
                name_job: 'Test'
            });
        
            const person = await Person.create({
                firstname: 'Sarah',
                lastname: 'Otmane',
                email: 'test@artisan.com',
                password: await argon2.hash('test'),
                mobile: '0603285298',
                role: 'artisan',
                subscribeNewsletter: false,
                id_address: null,
                id_artisan: artisan.id
            });
        
            const loginResponse = await supertest(app)
                .post('/persons/login')
                .send({
                    email: person.email,
                    password: 'test' 
                });
        
            const token = loginResponse.body.token;
        
            const product = await Product.create({
                id_prestation: null,
                id_artisan: null,
                price: 100
            });
            const presta = await Prestation.create({
                reparationType: 'testNettoyer3',
                priceSuggested: 100,
                name_job: 'Test'
            });
        
            const { statusCode } = await supertest(app)
                .put(`/products/${product.id}`)
                .send({
                    id_prestation: presta.id,
                    price: 100
                })
                .set('Authorization', 'Bearer ' + token);
        
            expect(statusCode).toBe(201);
        });
        
    });

    describe('DELETE /products/:id_product', () => {
        it('should return 404 if the product is not found', async () => {
            const { statusCode } = await supertest(app)
                .delete('/products/9999')
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 201 if the product is found and deleted', async () => {
            const product = await Product.create({
                id_prestation: null,
                id_artisan: null,
                price: 100
            });

            const { statusCode } = await supertest(app)
                .delete(`/products/${product.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(201);
        });
    });
});
