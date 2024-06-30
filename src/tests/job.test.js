const createServeur = require('../config/serveur');
const Job = require('../models/jobModel');
const supertest = require('supertest');

const app = createServeur();

describe('Job controller', () => {

    describe('POST /jobs', () => {
        it('should return 201 when creating a new job', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .send({
                    name: 'Test1'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when a job already exist', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .send({
                    name: 'Test1'
                });
            expect(statusCode).toBe(401);
        });
    });

    describe('GET /jobs', () => {
        it('should return 201 when getting all jobs', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/jobs')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no job is found', async () => {
            await Job.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .get('/jobs')

            expect(statusCode).toBe(404);
        });
    });
    
    describe('DELETE /jobs/:name_job', () => {
        it('should return 201 when deleting the job', async () => {
            await Job.create({name: 'Test1'});

            const { statusCode, body } = await supertest(app)
                .delete('/jobs/Test1')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the job is found', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/jobs/test')

            expect(statusCode).toBe(404);
        });
    });
    
});
