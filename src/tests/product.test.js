const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Prestation = require('../models/prestationModel');
const Product = require('../models/productModel');
const Server = require('../services/serveur');
const supertest = require('supertest');

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
    priceSuggested: 20,
    name_job: 'Test'
};

let token;

describe('Product controller', () => {
    afterEach( async() => {
        await Product.destroy({where: {price: 20}});
        await Artisan.destroy({ where: { siret: '123456789' } });
        await Prestation.destroy({ where: { name_job: 'Test' } });
        await Job.destroy({ where: { name: 'Test' } });
    });

    beforeAll(async() =>{
        const response = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'otmanesarah02@gmail.com',
                password: 'SARAHtest@2024'
            });

        token = response.body.token;
    })

    describe('GET /products/:id_artisan/:id_prestation', () => {
        it('should return 404 if no artisan is found', async() => {
            const { statusCode, body } = await supertest(app)
                .get(`/products/9999/9999`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if no prestation is found', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode, body } = await supertest(app)
                .get(`/products/${artisan.id}/9999`);

            expect(statusCode).toBe(404);
        });
        
        it('should return 404 if no product is found', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);

            const { statusCode, body } = await supertest(app)
                .get(`/products/${artisan.id}/${presta.id}`);

            expect(statusCode).toBe(404);
        });
        
        it('should return 201 when getting a product', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 20
            });

            const { statusCode, body } = await supertest(app)
                .get(`/products/${artisan.id}/${presta.id}`);

            expect(statusCode).toBe(201);
        });
    });
    

    describe('GET /products/:id_product', () => {
        it('should return 404 if no product is found', async() => {
            const { statusCode, body } = await supertest(app)
                .get(`/products/9999`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when no artisan is found', async() => {
            const product = await Product.create({
                id_artisan: null,
                id_prestation: null,
                price: 20
            });

            const { statusCode, body } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when no presta is found', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            const product = await Product.create({
                id_artisan: artisan.id,
                id_prestation: null,
                price: 20
            });

            const { statusCode, body } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when getting a product', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            const product = await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 20
            });

            const { statusCode, body } = await supertest(app)
                .get(`/products/${product.id}`);

            expect(statusCode).toBe(201);
        });
        
    });

    describe('GET /products/artisan/:id_artisan', () => {
        it('should return 404 if no artisan is found', async() => {
            const { statusCode, body } = await supertest(app)
                .get(`/products/artisan/9999`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if no artisan is found', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode, body } = await supertest(app)
                .get(`/products/artisan/${artisan.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when getting all products of an artisan', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            const presta = await Prestation.create(dataPrestation);
            await Product.create({
                id_artisan: artisan.id,
                id_prestation: presta.id,
                price: 20
            });

            const { statusCode, body } = await supertest(app)
                .get(`/products/artisan/${artisan.id}`)
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(201);
        });
    });
    

    describe('POST /products/artisan/:id_artisan', () => {
        it('should return 404 if the artisan is found', async() => {
            const { statusCode } = await supertest(app)
                .post(`/products/artisan/9999`)
                .send({
                    reparationType : 'testNettoyer',
                    price : 20
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 404 if the prestation is not found', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode } = await supertest(app)
                .post(`/products/artisan/${artisan.id}`)
                .send({
                    reparationType : 'testNettoyer',
                    price : 20
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });

        it('should return 201 when creating a product', async() => {
            await Job.create({name: 'Test'});
            const artisan = await Artisan.create(dataArtisan);
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .post(`/products/artisan/${artisan.id}`)
                .send({
                    reparationType : 'testNettoyer',
                    price : 20
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(201);
        });
    });
    
    describe('PUT /products/:id_product', () => {
        it('should return 404 if the artisan is found', async() => {
            const { statusCode } = await supertest(app)
                .post(`/products/9999`)
                .send({
                    reparationType : 'testNettoyer',
                    price : 20
                })
                .set('Authorization', 'Bearer ' + token);

            expect(statusCode).toBe(404);
        });
    });
    
});
