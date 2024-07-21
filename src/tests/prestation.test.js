const Server = require('../services/serveur');
const Job = require('../models/jobModel');
const Prestation = require('../models/prestationModel');
const supertest = require('supertest');
const Product = require('../models/productModel');

const app = new Server().app;

let dataPrestation = {
    reparationType: 'testNettoyer',
    priceSuggested: 100,
    name_job: 'Test'
};

let token;

describe('Prestation controller', () => {
    beforeAll(async () => {
        await require('../services/connectBdd').connect();
        await require('../services/tablesBdd').createTablesInOrder();
    });
    
    beforeAll(async () => {
        const responseAdmin = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarahotmane02@gmail.com',
                password: 'S@rah2024'
            });

        token = responseAdmin.body.token;
    });

    afterEach(async()=>{
        await Prestation.destroy({where : {priceSuggested: 100}});
        await Product.destroy({where: { price: 100}});
        await Job.destroy({where: {name : 'Test'}});
    })
    
    describe('GET /prestations', () => {
        it('should return 201 when getting all the prestations', async() => {
            await Job.create({ name: 'Test' });
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
            .get('/prestations')

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when no prestation is found', async() => {
            const { statusCode } = await supertest(app)
            .get('/prestations')

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /prestations/:id_prestation', () => {
        it('should return 201 when getting a presta by its id', async() => {
            await Job.create({ name: 'Test' });
            const presta = await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
            .get(`/prestations/${presta.id}`)

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when no prestation is found', async() => {
            const { statusCode } = await supertest(app)
                .get('/prestations/9999');

            expect(statusCode).toBe(404);
        })
    });

    describe('GET /prestations/job/:name_job', () => {
        it('should return 201 when getting all presta of a job', async() => {
            await Job.create({ name: 'Test' });
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
            .get(`/prestations/job/Test`)

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when no prestation is found', async() => {
            const { statusCode } = await supertest(app)
                .get('/prestations/job/dont');

            expect(statusCode).toBe(404);
        })
    });
    
    describe('POST /prestations', () => {
        it('should return 201 when creating a new prestation', async() => {
            await Job.create({ name: 'Test' });
            const { statusCode } = await supertest(app)
                .post('/prestations')
                .send(dataPrestation)
                .set('Authorization', `Bearer ${token}`)

            expect(statusCode).toBe(201);
        });
        
        it('should return 401 when the presta is in the DB', async() => {
            await Job.create({ name: 'Test' });
            await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .post('/prestations')
                .send(dataPrestation)
                .set('Authorization', `Bearer ${token}`)

            expect(statusCode).toBe(401);
        });
    });

    describe('DELETE /prestations/:id_prestation', () => {
        it('should return 201 when deleting a prestation', async() => {
            await Job.create({ name: 'Test' });
            const presta = await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .delete(`/prestations/${presta.id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when the prestation is not found', async() => {
            const { statusCode } = await supertest(app)
                .delete(`/prestations/9999`)
                .set('Authorization', `Bearer ${token}`)

            expect(statusCode).toBe(404);
        });
    });
    
    describe('PUT /prestations/:id_prestation', () => {
        it('should return 201 when updating a prestation', async() => {
            await Job.create({ name: 'Test' });
            const presta = await Prestation.create(dataPrestation);

            const { statusCode } = await supertest(app)
                .put(`/prestations/${presta.id}`)
                .send({
                    reparationType: 'Test6',
                    priceSuggested: 100,
                    name_job: 'Test'
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(201);
        });
        
        it('should return 404 when the prestation is not found', async() => {
            const { statusCode } = await supertest(app)
                .delete(`/prestations/9999`)
                .set('Authorization', `Bearer ${token}`)

            expect(statusCode).toBe(404);
        });
    });
    
});
