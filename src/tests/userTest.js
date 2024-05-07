const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');


describe('User Controller', () => {

    //Test de la méthode registerAUser
    describe('POST /users/register', ()=>{
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/users/register')
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
            expect(res.body).toEqual({message: `Utilisateur créé avec succès. L'email : sarah@user.com ` });
        });

        it('should return 409 if email already exists', async() =>{
            const res = await request(app)
                .post('/users/register')
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
            expect(res.statusCode).toEqual(409);
            expect(res.body).toEqual({message: `Cet email existe déjà.` });
        });

        it('should return 401 if the role is admin', async() =>{
            const res = await request(app)
                .post('/users/register')
                .send({
                    email: 'sarah@user.com',
                    password: 'sarah',
                    role: 'admin',
                    firstname: 'sarah',
                    lastname: 'otmane',
                    mobile: '0606060606',
                    subscribeNewsletter: false,
                    streetAdress: '40 chemin vert',
                    city: 'Paris',
                    country: 'France',
                    postalCode: 75011
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({message: `Vous ne pouvez pas créer un utilisateur avec le rôle admin.` });
        });

        it('should return 500 if error in server', async() =>{
            const res = await request(app)
                .post('/users/register')
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
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: `Erreur serveur` });
        });
    });



    // Test de la méthode loginAUser
    describe('POST /users/login', () => {
        it('should log in a user ', async()=>{
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'sarah@user.com',
                    password: 'sarah'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 404 if user not found', async()=>{
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'sarah@us.com',
                    password: 'sarah'
                });
                expect(res.statusCode).toEqual(404);
                expect(res.body).toHaveProperty('Email ou mot de passe incorrect');
        });
        
        it('should return 404 if password is false', async()=>{
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'sarah@user.com',
                    password: 'test'
                });
                expect(res.statusCode).toEqual(404);
                expect(res.body).toHaveProperty('Email ou mot de passe incorrect');
        });

        it('should return 500 if error in server', async() =>{
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'sarah@user.com',
                    password: 'sarah',
                });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: `Erreur serveur` });
        });
    });
    
    
    //Test de la methode getAUser
    describe('GET /users', () => {
        it('should get user details', async()=>{
            const existingUser = await User.findOne({ where: { email: 'sarah@user.com' } });

            const res = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYXJhaDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTUwNjk0MDYsImV4cCI6MTcxNzY2MTQwNn0.dDLv0fsPWdtHxohv_zKy6V0anSHqBs-oVhyOMm00r1M');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                id: existingUser.id,
                email: existingUser.email,
                password: existingUser.password,
                role: existingUser.role,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                mobile: existingUser.mobile,
                subscribeNewsletter: existingUser.subscribeNewsletter,
                streetAdress: existingUser.streetAdress,
                city: existingUser.city,
                country: existingUser.country,
                postalCode: existingUser.postalCode,
                createdAt: existingUser.createdAt,
                updatedAt: existingUser.updatedAt
            });
        });

        if('should return 403 if the token is invalid', async() =>{
            const res = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYXJhaDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTUwNjk0MDYsImV4cCI6MTcxNzY2MTQwNn0.dDLv0fsPWdtHxohv_zKy6V0anSHqBs-oVebfkzbb');
            expect(res.statusCode).toEqual(403)
            expect(res.body).toEqual({message: `Accès interdit: token invalide` })
        });

        if('should return 403 if the token is invalid', async() =>{
            const res = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer ');
            expect(res.statusCode).toEqual(403)
            expect(res.body).toEqual({message: `Accès interdit: token manquant` })
        });

        if('should return 404 if the user doesn\'t exist', async() =>{
            const res = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYXJhaDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTUwNjk0MDYsImV4cCI6MTcxNzY2MTQwNn0.dDLv0fsPWdtHxohv_zKy6V0anSHqBs-oVhyOMm00r1M');
            expect(res.statusCode).toEqual(404)
            expect(res.body).toEqual({message: `Utilisateur non trouvé` })
        });

        it('should return 500 if error in server', async() =>{
            const res = await request(app)
                .get('/users')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYXJhaDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTUwNjk0MDYsImV4cCI6MTcxNzY2MTQwNn0.dDLv0fsPWdtHxohv_zKy6V0anSHqBs-oVhyOMm00r1M');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: `Erreur serveur` });
        });
    });
    
});
