const Server = require('../services/serveur');
const Job = require('../models/jobModel');
const supertest = require('supertest');

const app = new Server().app;

let token;

describe('Job controller', () => {
    beforeAll(async () => {
        await require('../services/connectBdd').connect();
        await require('../services/tablesBdd').createTablesInOrder();
    });
    
    beforeAll(async() =>{
        const response = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarahotmane02@gmail.com',
                password: 'S@rah2024'
            });
        
            token = response.body.token;
    });

    afterEach(async() => {
        await Job.destroy({where: {name: 'Test1'}});
        await Job.destroy({where: {name: 'Test2'}});
    });

    describe('POST /jobs', () => {
        it('should return 201 when creating a new job', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .send({
                    name: 'Test1'
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(201);
            expect(body.message).toBe('Job créé avec succès.');
        });

        it('should return 401 when a job already exists', async () => {
            await Job.create({name: 'Test1'});

            const { statusCode, body } = await supertest(app)
                .post('/jobs')
                .send({
                    name: 'Test1'
                })
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(401);
            expect(body.message).toBe('Ce job existe déjà.');
        });
    });

    describe('GET /jobs', () => {
        it('should return 201 when getting all jobs', async () => {
            await Job.create({name: 'Test1'});
            await Job.create({name: 'Test2'});

            const { statusCode } = await supertest(app)
                .get('/jobs')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no job is found', async () => {
            await Job.destroy({where: {}});
            const { statusCode, body } = await supertest(app)
                .get('/jobs')

            expect(statusCode).toBe(404);
            expect(body.message).toBe('Aucun job trouvé.');
        });
    });

    describe('DELETE /jobs/:name_job', () => {
        it('should return 201 when deleting the job', async () => {
            await Job.create({name: 'Test1'});

            const { statusCode, body } = await supertest(app)
                .delete('/jobs/Test1')
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(201);
            expect(body.message).toBe('Job supprimé avec succès.');
        });

        it('should return 404 when the job is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/jobs/test')
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).toBe(404);
            expect(body.message).toBe('Job non trouvé.');
        });
    });
});
