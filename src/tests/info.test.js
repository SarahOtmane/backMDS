const Server = require('../services/serveur');
const Info = require('../models/infoModel');
const supertest = require('supertest');

const app = new Server().app;


describe('Info controller', () => {
    afterEach(async() =>{
        await Info.destroy({where: {name: 'Test1'}});
    })

    describe('POST /infos', () => {
        it('should return 201 when creating a new info', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/infos')
                .send({
                    name: 'Test1',
                    content: 'Content1'
                });
            expect(statusCode).toBe(201);
        });

        it('should return 401 when an info already exist', async () => {
            await Info.create({name: 'Test1', content: 'Content1' });

            const { statusCode, body } = await supertest(app)
                .post('/infos')
                .send({
                    name: 'Test1',
                    content: 'Content1'
                });
            expect(statusCode).toBe(401);
        });
    });


    describe('GET /infos', () => {
        it('should return 201 when getting all infos', async () => {
            await Info.create({name: 'Test1', content: 'Content1' });
            const { statusCode, body } = await supertest(app)
                .get('/infos')

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no info is found', async () => {
            const { statusCode, body } = await supertest(app)
                .get('/infos')

            expect(statusCode).toBe(404);
        });
    });

    describe('GET /infos/:name_info', () => {
        it('should return 201 when getting the details of info', async () => {
            const info = await Info.create({name: 'Test1', content: 'Content1' });

            const { statusCode, body } = await supertest(app)
                .get(`/infos/${info.name}`);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the info is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .get(`/infos/test`);

            expect(statusCode).toBe(404);
        });
    });

    describe('PUT /infos/:name_info', () => {
        it('should return 201 when updating the info', async () => {
            const info = await Info.create({name: 'Test1', content: 'Content1' });

            const { statusCode, body } = await supertest(app)
                .put(`/infos/${info.name}`)
                .send({
                    name: 'Test1', 
                    content: 'Content3'
                })

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the info is not found', async () => {
            const { statusCode, body } = await supertest(app)
                .put(`/infos/teeest`)
                .send({
                    name: 'Test1', 
                    content: 'Content3'
                })

            expect(statusCode).toBe(404);
        });
    });

    describe('DELETE /infos/:name_info', () => {
        it('should return 201 when deleting the info', async () => {
            const info = await Info.create({name: 'Test1', content: 'Content1' });

            const { statusCode, body } = await supertest(app)
                .delete(`/infos/${info.name}`);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when the info is found', async () => {
            const { statusCode, body } = await supertest(app)
                .delete('/info/teeeeest')

            expect(statusCode).toBe(404);
        });
    });

});
