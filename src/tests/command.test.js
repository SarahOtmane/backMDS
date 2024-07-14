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

describe('Command controller', () => {
    beforeAll(async() =>{
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

    afterEach(async() =>{
        await Job.destroy({where : {name: 'Test'}});
        await Artisan.destroy({where : {siret: '123456789'}});
        await Cloth.destroy({where: {name_job: 'Test'}});
        await Prestation.destroy({where: {name_job: 'Test'}});
        await Product.destroy({where : {price : 100}});
        await Command.destroy({where : {picture: 'sarah'}});
    });

    describe('GET /commands', () => {
        it('should return 200 when getting all the commands', async() => {
            const job = await Job.create({
                name: 'Test'
            });

            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : job.name
            });

            const cloth = await Cloth.create({
                category: 'Haut',
                clothType: 'T-shirt',
                name_job: job.name,
            });

            const prestation = await Prestation.create({
                reparationType: 'testNettoyer',
                priceSuggested : 20,
                name_job: job.name,
            });

            const product = await Product.create({
                price : 100,
                id_prestation : prestation.id,
                id_artisan : artisan.id
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

        it('should return 404 when no command is found', async() => {

            const { statusCode } = await supertest(app)
                .get('/commands')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(statusCode).toBe(404);
        });
        
    });

    describe('GET /commands/users', () => {
        it('should return 200 when getting all the commands of users', async() => {
            const job = await Job.create({
                name: 'Test'
            });

            const artisan = await Artisan.create({
                acceptNewOrder: 1,
                siret: '123456789',
                tva: 'FR123456789',
                description : 'test',
                picture: 'test',
                name_job : job.name
            });

            const cloth = await Cloth.create({
                category: 'Haut',
                clothType: 'T-shirt',
                name_job: job.name,
            });

            const prestation = await Prestation.create({
                reparationType: 'testNettoyer',
                priceSuggested : 20,
                name_job: job.name,
            });

            const product = await Product.create({
                price : 100,
                id_prestation : prestation.id,
                id_artisan : artisan.id
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

        it('should return 404 when no command is found', async() => {

            const { statusCode } = await supertest(app)
                .get('/commands/user')
                .set('Authorization', `Bearer ${tokenUser}`);

            expect(statusCode).toBe(404);
        });
        
    });
    
    
});
