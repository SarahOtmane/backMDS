const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');


describe('User Controller', () => {

    //Test de la méthode registerAUser
    describe('POST users/register', ()=>{
        it('should register a new user', async () => {
            const res = await request(app)
                .post('users/register')
                .send({
                    email: 'sarah@user.com',
                    password: 'sarah',
                    role: 'user',
                    firstname: 'sarah',
                    lastname: 'otmane',
                    mobile: '0606060606',
                    subscribeNewsletter: false,
                    streetAdress: '40 chemin vert',
                    city: 'Paris',
                    country: 'France',
                    postalCode: 75011
                });
            expect(res.statusCode).toEqual(201);
            expect(res.json).toEqual({message: `Utilisateur créé avec succès. L'email : sarah@user.com ` });
        });
    });


    
});
