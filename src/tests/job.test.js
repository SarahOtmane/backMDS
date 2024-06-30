const createServeur = require('../config/serveur');
const Job = require('../models/jobModel');
const { Op, where } = require('sequelize');
const supertest = require('supertest');

const app = createServeur();

describe('Job controller', () => {
    beforeEach(async() =>{
        const tokenRes = await supertest(app)
            .post('/users/login')
            .send({
                email: 'sarah2@admin.com',
                password: 'sarah2',
            });
            
        token = tokenRes.body.token;
    });

    describe('POST /jobs', () => {
        it('should return 201 when creating a new job', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .set("authorization", token)
                .send({
                    name: 'Cordonnerie'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when a job already exist', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .set("authorization", token)
                .send({
                    name: 'Couture'
                });
            expect(statusCode).toBe(401);
        });
    });

    describe('Get /jobs/:name_job', () => {
        it('should return 201 when getting the job\'s informations', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/jobs/Couture')
                .set("authorization", token);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the job is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/jobs/Test')
                .set("authorization", token);

            expect(statusCode).toBe(404);
        });
    });
    
    describe('Get /jobs/:id_job', () => {
        it('should return 201 when getting the job\'s id', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/jobs/7')
                .set("authorization", token);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the job is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/jobs/0')
                .set("authorization", token);

            expect(statusCode).toBe(404);
        });
    });
    
    
});
