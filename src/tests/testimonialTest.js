const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const testimonialController = require('../controllers/testimonialController.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.get('/testimonials', testimonialController.getAllTestimonial);
app.get('/testimonials/artisan/:id_artisan', testimonialController.getAllTestimonialForArtisan);
app.post('/testimonials/artisan/:id_artisan', testimonialController.createATestimonial);
app.get('/testimonials/:id_testimonial', testimonialController.getATestimonial);
app.put('/testimonials/:id_testimonial', testimonialController.putATestimonial);
app.delete('/testimonials/:id_testimonial', testimonialController.deleteATestimonial);

// Mock dependencies
jest.mock('../models/testimonialModel.js');

const Testimonial = require('../models/testimonialModel.js');

describe('Testimonial Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all testimonials', async () => {
        Testimonial.findAll.mockResolvedValue([{ id: 1, content: 'Testimonial 1' }]);

        const response = await request(app)
            .get('/testimonials');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get testimonials by artisan', async () => {
        Testimonial.findAll.mockResolvedValue([{ id: 1, content: 'Testimonial 1' }]);

        const response = await request(app)
            .get('/testimonials/artisan/1');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should create a testimonial', async () => {
        Testimonial.create.mockResolvedValue({ id: 1 });

        const response = await request(app)
            .post('/testimonials/artisan/1')
            .send({
                content: 'Great job!',
                picture: 'pic.jpg',
                stars: 5
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should get testimonial by id', async () => {
        Testimonial.findOne.mockResolvedValue({ id: 1, content: 'Testimonial 1' });

        const response = await request(app)
            .get('/testimonials/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should update a testimonial', async () => {
        Testimonial.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/testimonials/1')
            .send({
                content: 'Updated content',
                picture: 'updated_pic.jpg',
                stars: 4
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Testimonial updated successfully.');
    });

    test('should delete a testimonial', async () => {
        Testimonial.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/testimonials/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Testimonial deleted successfully.');
    });
});
