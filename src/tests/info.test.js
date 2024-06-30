const createServeur = require('../config/serveur');
const Info = require('../models/infoModel');
const supertest = require('supertest');

const app = createServeur();


describe('Info controller', () => {
    beforeEach(async() =>{
        await Info.destroy({where: {}});
    })

    afterEach(async() =>{
        await Info.destroy({where: {}});
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

});
