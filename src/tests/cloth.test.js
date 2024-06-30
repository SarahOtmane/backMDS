const createServeur = require('../config/serveur');
const Job = require('../models/jobModel');
const Cloth = require('../models/clothModel');
const supertest = require('supertest');

const app = createServeur();

describe('Cloth controller', () => {

    beforeEach(async () => {
        await Job.create({ name: 'Couture' });
        await Job.create({ name: 'Maroquinnerie' });
    });

    describe('POST /clothes', () => {
        it('should return 201 when creating a new cloth', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/clothes')
                .send({
                    categorie: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'Couture'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when a cloth already exist', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/clothes')
                .send({
                    categorie: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'Couture'
                });
            expect(statusCode).toBe(401);
        });

        it('should return 400 when the job is found', async () => {
            await Job.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .post('/clothes')
                .send({
                    categorie: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'Couture'
                });
            expect(statusCode).toBe(400);
        });
    });

    describe('PUT /clothes/:id_cloth', () => { 
        it('should return 201 when updating a cloth', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/clothes/1')
                .send({
                    categorie: 'Haut',
                    clothType: 'Doudoune',
                    name_job: 'Couture'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when the cloth is found', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/clothes/10')
                .send({
                    categorie: 'Haut',
                    clothType: 'Vestes',
                    name_job: 'Couture'
                });
            expect(statusCode).toBe(401);
        });

        it('should return 400 when the job is found', async () => {
            await Job.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .post('/clothes/1')
                .send({
                    categorie: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'Cordonnerie'
                });
            expect(statusCode).toBe(400);
        });
    });

    describe('GET /clothes', () => {
        it('should return 201 when getting all clothes', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no cloth is found', async () => {
            await Job.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .get('/clothes')

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /clothes/job/:name_job', () => {
        it('should return 201 when getting all clothes of a job', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes/job/couture')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no cloth is found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes/maroquinnerie')

            expect(statusCode).toBe(404);
        });

        it('should return 400 when the job is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes/test')

            expect(statusCode).toBe(404);
        });
    });
    
    describe('DELETE /clothes/:id_cloth', () => {
        it('should return 201 when deleting the cloth', async () => {

            const { statusCode, body } = await supertest(app)
                .delete('/clothes/1')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the cloth is found', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/clothes/20')

            expect(statusCode).toBe(404);
        });
    });
    
});
