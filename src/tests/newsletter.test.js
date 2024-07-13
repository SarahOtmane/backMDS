const Server = require('../services/serveur');
const Newsletter = require('../models/newsletterModel');
const Person = require('../models/personModel');
const supertest = require('supertest');

const app = new Server().app;

let token;

// describe('Newsletter controller', () => {
//     beforeAll(async() =>{
//         const response = await supertest(app)
//             .post(`/persons/login`)
//             .send({
//                 email: 'sarahotmane02@gmail.com',
//                 password: 'S@rah2024'
//             });
        
//             token = response.body.token;
//     });

//     afterEach(async () => {
//         await Newsletter.destroy({ where: {email: 'test@gmail.com'} });
//         await Person.destroy({ where: {email: 'test@gmail.com'} });
//     });

//     describe('POST /newsletters', () => {
//         it('should return 201 when it subscribe a person', async () => {
//             const { statusCode } = await supertest(app)
//                 .post(`/newsletters`)
//                 .send({
//                     email: 'test@gmail.com'
//                 });
//             expect(statusCode).toBe(201);
//         });

//         it('should return 201 when it subscribe a user', async () => {
//             await Person.create({
//                 email: 'test@gmail.com',
//                 password: 'test',
//                 role: 'user',
//                 firstname: 'test',
//                 lastname: 'test',
//                 phone: '1234567890',
//                 subscribeNewsletter: false,
//                 id_adress: null,
//                 id_artisan: null
//             });
//             const { statusCode } = await supertest(app)
//                 .post(`/newsletters`)
//                 .send({
//                     email: 'test@gmail.com'
//                 });
//             expect(statusCode).toBe(201);
//         });

//         it('should return 401 when it subscribe a person already subscribed', async () => {
//             await Newsletter.create({email: 'test@gmail.com'});

//             const { statusCode } = await supertest(app)
//                 .post(`/newsletters`)
//                 .send({
//                     email: 'test@gmail.com'
//                 });
//             expect(statusCode).toBe(401);
//         });
//     });
    
//     describe('GET /newsletters', () => {
//         it('should return 201 when it getting all the subscribers to the newsletter', async () => {
//             await Newsletter.create({email: 'test@gmail.com'});

//             const { statusCode } = await supertest(app)
//                 .get(`/newsletters`)
//                 .set('Authorization', `Bearer ${token}`);

//             expect(statusCode).toBe(201);
//         });

//         it('should return 404 when no newsletter is found', async () => {
//             const { statusCode } = await supertest(app)
//                 .get(`/newsletters`)
//                 .set('Authorization', `Bearer ${token}`);

//             expect(statusCode).toBe(404);
//         });
//     });
    
// });
