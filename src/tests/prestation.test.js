const Server = require('../services/serveur');
const supertest = require('supertest');

const app = new Server().app;

let dataPrestation = {
    reparationType: 'testNettoyer',
    priceSuggested: 20,
    name_job: 'Test'
};

describe('Prestation controller', () => {
    
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
    
});
