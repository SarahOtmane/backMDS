const Server = require('../services/serveur');
const Artisan = require('../models/artisanModel');
const Job = require('../models/jobModel');
const Person = require('../models/personModel');
const Address = require('../models/adressModel');
const Command = require('../models/commandModel')
const supertest = require('supertest');

const app = new Server().app;

let tokenUser;
let tokenAdmin;

describe('Command controller', () => {
    beforeAll(async() =>{
        const responseAdmin = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarahotmane02@gmail.com',
                password: 'S@rah2024'
            });
        
            tokenAdmin = responseAdmin.body.token;

        const responseUser = await supertest(app)
            .post(`/persons/login`)
            .send({
                email: 'sarah1@user.com',
                password: 'sarah1'
            });
        
            tokenUser = responseUser.body.token;
    })

    describe('GET /commands', () => {
        it('should return 201 when getting all the commands', async() => {

            const { statusCode } = await supertest(app)
                .post('/commands')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(statusCode).toBe(201);
        });

        it('should return 404 when no command is found', async() => {

            const { statusCode } = await supertest(app)
                .post('/commands')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(statusCode).toBe(404);
        });
        
    });
    
});
