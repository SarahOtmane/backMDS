const Server = require('../services/serveur');
const Job = require('../models/jobModel');
const Cloth = require('../models/clothModel');
const supertest = require('supertest');

const app = new Server().app;

let token;

describe('Cloth controller', () => {
    beforeAll(async() =>{
        const response = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarahotmane02@gmail.com',
                password: 'S@rah2024'
            });
        
            token = response.body.token;
    });

    afterEach(async () => {
        await Cloth.destroy({where: {name_job: 'testt'}});
        await Job.destroy({where: {name: 'testt'}});
    });

    describe('POST /clothes', () => {
        it('should return 201 when creating a new cloth', async () => {
            await Job.create({name: 'testt'});

            const { statusCode } = await supertest(app)
                .post('/clothes')
                .send({
                    category: 'Test1',
                    clothType: 'T-shirt',
                    name_job: 'testt',
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(201);
        });

        it('should return 409 when a cloth already exists', async () => {
            await Job.create({name: 'testt'});
            await Cloth.create({category: 'Test1', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode } = await supertest(app)
                .post('/clothes')
                .send({
                    category: 'Test1',
                    clothType: 'T-shirt',
                    name_job: 'testt',
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(409);
        });

        it('should return 400 when the job is not found', async () => {
            const { statusCode } = await supertest(app)
                .post('/clothes')
                .send({
                    category: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'nonexistent',
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(400);
        });
    });

    describe('PUT /clothes/:id_cloth', () => {
        it('should return 200 when updating a cloth', async () => {
            await Job.create({name: 'testt'});
            const cloth = await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode } = await supertest(app)
                .put(`/clothes/${cloth.id}`)
                .send({
                    category: 'Haut',
                    clothType: 'Doudoune',
                    name_job: 'testt',
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(200);
        });

        it('should return 404 when the cloth is not found', async () => {
            const { statusCode } = await supertest(app)
                .put('/clothes/9999')
                .send({
                    category: 'Haut',
                    clothType: 'Vestes',
                    name_job: 'testt',
                })
                .set('Authorization', `Bearer ${token}`);
                
            expect(statusCode).toBe(404);
        });

        it('should return 400 when the job is not found', async () => {
            await Job.create({name: 'testt'});
            const cloth = await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});
    
            const { statusCode } = await supertest(app)
                .put(`/clothes/${cloth.id}`)
                .send({
                    category: 'Haut',
                    clothType: 'T-shirt',
                    name_job: 'nonexistent',
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(400);
        });
    });

    describe('GET /clothes', () => {
        it('should return 200 when getting all clothes', async () => {
            await Job.create({name: 'testt'});
            await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode, body } = await supertest(app)
                .get('/clothes');

            expect(statusCode).toBe(200);
        });

        it('should return 404 when no cloth is found', async () => {
            await Cloth.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .get('/clothes');

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /clothes/job/:name_job', () => {
        it('should return 200 when getting all clothes of a job', async () => {
            await Job.create({name: 'testt'});
            await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode, body } = await supertest(app)
                .get('/clothes/job/testt');

            expect(statusCode).toBe(200);
        });

        it('should return 404 when no cloth is found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes/job/test');

            expect(statusCode).toBe(404);
        });

        it('should return 404 when the job is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/clothes/job/teeeeest');

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /clothes/:id_cloth', () => {
        it('should return 200 when getting the details of a cloth', async () => {
            await Job.create({name: 'testt'});
            const cloth = await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode } = await supertest(app)
                .get(`/clothes/${cloth.id}`)
            expect(statusCode).toBe(200);
        });

        it('should return 404 when the cloth is not found', async () => {
            const { statusCode } = await supertest(app)
                .get('/clothes/9999')
            expect(statusCode).toBe(404);
        });
    });

    describe('DELETE /clothes/:id_cloth', () => {
        it('should return 200 when deleting the cloth', async () => {
            await Job.create({name: 'testt'});
            const cloth = await Cloth.create({category: 'Haut', clothType: 'T-shirt', name_job: 'testt'});

            const { statusCode } = await supertest(app)
                .delete(`/clothes/${cloth.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(200);
        });

        it('should return 404 when the cloth is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/clothes/9999')
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(404);
        });
    });

});
