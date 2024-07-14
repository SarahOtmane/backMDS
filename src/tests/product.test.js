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

describe('Product controller', () => {
    afterEach( async() => {
        await Artisan.destroy({ where: { siret: '123456789' } });
        await Prestation.destroy({ where: { name_job: 'Test' } });
        await Job.destroy({ where: { name: 'Test' } });
    });

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
    
});
