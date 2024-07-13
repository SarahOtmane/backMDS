const Server = require('../services/serveur');
const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const supertest = require('supertest');

const app = new Server().app;


describe('Artisan controller', () => {
    beforeEach(async() =>{
        await Job.create({name: 'Test'});
    })

    afterEach(async() =>{
        await Job.destroy({where: {name: 'Test'}});
        await Artisan.destroy({where: {siret: '123456789'}});
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
    
});
