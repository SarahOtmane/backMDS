const Server = require('../services/serveur');
const Address = require('../models/adressModel');
const supertest = require('supertest');

const app = new Server().app;


describe('Address controller', () => {
    describe('GET /addresses/:id_address', () => {
        afterEach(async() =>{
            await Address.destroy({where: {city: 'TEST'}});
        })

        it('should return 200 when getting all addresses', async() => {
            const address = await Address.create({
                streetAddress: '23 test',
                city: 'TEST',
                postalCode: '92100',
                country: 'France'
            });

            const { statusCode, body } = await supertest(app)
                .get(`/addresses/${address.id}`);

            expect(statusCode).toBe(200);
        });
        
        it('should return 401 when no address is found', async() => {
            const { statusCode, body } = await supertest(app)
                .get(`/addresses/9999`);

            expect(statusCode).toBe(401);
        });
    });
    
});
