const Server = require('../services/serveur');
const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Command = require('../models/commandModel');
const Product = require('../models/productModel');
const Cloth = require('../models/clothModel');
const Prestation = require('../models/prestationModel');
const supertest = require('supertest');

const app = new Server().app;

let tokenUser;
let tokenAdmin;
let dataArtisan = {
    acceptNewOrder: 1,
    siret: '123456789',
    tva: 'FR123456789',
    description: 'test',
    picture: 'test',
    name_job: 'Test'
};
let dataCloth = {
    category: 'Test',
    clothType: 'T-shirt',
    name_job: 'Test'
};
let dataPrestation = {
    reparationType: 'Test4',
    priceSuggested: 100,
    name_job: 'Test'
};

describe('Command controller', () => {
    beforeAll(async () => {
        const responseAdmin = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarahotmane02@gmail.com',
                password: 'S@rah2024'
            });

        tokenAdmin = responseAdmin.body.token;

        const responseUser = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarah1@user.com',
                password: 'sarah1'
            });

        tokenUser = responseUser.body.token;
    });

    afterEach(async () => {
        await Artisan.destroy({ where: { siret: '123456789' } });
        await Cloth.destroy({ where: { category: 'Test' } });
        await Prestation.destroy({ where: { priceSuggested: 100 } });
        await Product.destroy({ where: { price: 100 } });
        await Command.destroy({ where: { picture: 'sarah' } });
        await Job.destroy({ where: { name: 'Test' } });
    });

    describe('GET /commands', () => {
        it('should return 200 when getting all the commands', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const cloth = await Cloth.create(dataCloth);
            const prestation = await Prestation.create(dataPrestation);
            const product = await Product.create({
                price: 100,
                id_prestation: prestation.id,
                id_artisan: artisan.id
            });

            await Command.create({
                name: '123456',
                picture: 'sarah',
                dateFinished: null,
                email_user: 'sarah1@user.com',
                id_product: product.id,
                id_cloth: cloth.id
            });

            const { statusCode } = await supertest(app)
                .get('/commands')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(statusCode).toBe(200);
        });

        it('should return 404 when no command is found', async () => {
            const { statusCode } = await supertest(app)
                .get('/commands')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /commands/users', () => {
        it('should return 200 when getting all the commands of users', async () => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            const cloth = await Cloth.create(dataCloth);
            const prestation = await Prestation.create(dataPrestation);
            const product = await Product.create({
                price: 100,
                id_prestation: prestation.id,
                id_artisan: artisan.id
            });

            await Command.create({
                name: '123456',
                picture: 'sarah',
                dateFinished: null,
                email_user: 'sarah1@user.com',
                id_product: product.id,
                id_cloth: cloth.id
            });

            const { statusCode } = await supertest(app)
                .get(`/commands/users`)
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(200);
        });

        it('should return 404 when no command is found', async () => {
            const { statusCode } = await supertest(app)
                .get('/commands/user')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });
    });
    
    describe('POST /commands/:id_artisan', () => {
        it('should return 201 when creating a command', async() => {
            const job = await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            await Cloth.create(dataCloth);
            const prestation = await Prestation.create(dataPrestation);
            await Product.create({
                price: 100,
                id_prestation: prestation.id,
                id_artisan: artisan.id
            });

            const { statusCode } = await supertest(app)
            .post(`/commands/${artisan.id}`)
            .send({
                name: '123456',
                picture: 'sarah',
                dateFinished: null,
                category : 'Test',
                clothType : 'T-shirt',
                name_job : job.name,
                reparationType: 'Test4'
            })
            .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when the artisan is not found', async() => {
            const { statusCode } = await supertest(app)
                .post(`/commands/999`)
                .send({
                    name: '123456',
                    picture: 'sarah',
                    dateFinished: null,
                    category : 'Test',
                    clothType : 'T-shirt',
                    name_job : 'Test',
                    reparationType: 'Test4'

                })
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when the cloth is not found', async() => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);

            const { statusCode } = await supertest(app)
                .post(`/commands/${artisan.id}`)
                .send({
                    name: '123456',
                    picture: 'sarah',
                    dateFinished: null,
                    category : 'Test',
                    clothType : 'T-shirt',
                    name_job : 'Test',
                    reparationType: 'Test4'

                })
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });
        
        it('should return 404 when the presta is not found', async() => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            await Cloth.create(dataCloth);

            const { statusCode } = await supertest(app)
                .post(`/commands/${artisan.id}`)
                .send({
                    name: '123456',
                    picture: 'sarah',
                    dateFinished: null,
                    category : 'Test',
                    clothType : 'T-shirt',
                    name_job : 'Test',
                    reparationType: 'Test4'

                })
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });

        it('should return 404 when the product is not found', async() => {
            await Job.create({ name: 'Test' });
            const artisan = await Artisan.create(dataArtisan);
            await Cloth.create(dataCloth);
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .post(`/commands/${artisan.id}`)
                .send({
                    name: '123456',
                    picture: 'sarah',
                    dateFinished: null,
                    category : 'Test',
                    clothType : 'T-shirt',
                    name_job : 'Test',
                    reparationType: 'Test4'

                })
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });
    });
    
});
