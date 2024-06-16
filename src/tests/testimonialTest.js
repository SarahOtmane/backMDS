const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const testimonialController = require('../controllers/testimonialController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const Testimonial = require('../models/testimonialModel');
const Artisan = require('../models/artisanModel');

jest.mock('../models/testimonialModel');
jest.mock('../models/artisanModel');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes as in testimonialRoute.js
app.post('/artisan/:id_artisan', jwtMiddleware.verifyTokenUser, testimonialController.createATestimonial);
app.put('/:id_testimonial', jwtMiddleware.verifyTokenUser, testimonialController.putATestimonial);
app.delete('/:id_testimonial', jwtMiddleware.verifyTokenUser, testimonialController.deleteATestimonial);
app.get('/', testimonialController.getAllTestimonial);
app.get('/artisan/:id_artisan', testimonialController.getAllTestimonialForArtisan);
app.get('/:id_testimonial', testimonialController.getATestimonial);

// Mock middleware
jest.mock('../middlewares/jwtMiddleware', () => ({
  verifyTokenUser: (req, res, next) => {
    req.user = { id: 1, role: 'user' };
    next();
  },
}));

describe('Testimonial Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createATestimonial', () => {
    test('should create a new testimonial', async () => {
      Artisan.findByPk.mockResolvedValue({ id: 1 });
      Testimonial.create.mockResolvedValue({ id: 1 });

      const response = await request(app)
        .post('/artisan/1')
        .send({
          content: 'Great service!',
          picture: 'picture.jpg',
          stars: 5
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Témoignage créé avec succès.');
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/artisan/1')
        .send({
          content: 'Great service!',
          picture: 'picture.jpg',
          stars: 5
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Artisan non trouvé.');
    });
  });

  describe('putATestimonial', () => {
    test('should update a testimonial', async () => {
      Testimonial.findOne.mockResolvedValue({ id: 1, id_user: 1, update: jest.fn() });

      const response = await request(app)
        .put('/1')
        .send({
          content: 'Updated testimonial content',
          picture: 'updated_picture.jpg',
          stars: 4
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Temoignage mis à jour avec succès.');
    });

    test('should return 403 if user does not own the testimonial', async () => {
      Testimonial.findOne.mockResolvedValue({ id: 1, id_user: 2 });

      const response = await request(app)
        .put('/1')
        .send({
          content: 'Updated testimonial content',
          picture: 'updated_picture.jpg',
          stars: 4
        });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Vous n\'avez pas l\'autorisation de modifier ce témoignage.');
    });
  });

  describe('deleteATestimonial', () => {
    test('should delete a testimonial', async () => {
      Testimonial.findByPk.mockResolvedValue({ id: 1, id_user: 1 });
      Testimonial.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Testimonial supprimé avec succès.');
    });

    test('should return 403 if user does not own the testimonial or is not admin', async () => {
      Testimonial.findByPk.mockResolvedValue({ id: 1, id_user: 2 });

      const response = await request(app)
        .delete('/1');

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Vous n\'avez pas l\'autorisation de supprimer ce témoignage.');
    });
  });

  describe('getAllTestimonial', () => {
    test('should get all testimonials', async () => {
      Testimonial.findAll.mockResolvedValue([{ id: 1, content: 'Great service!', stars: 5 }]);

      const response = await request(app)
        .get('/');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].content).toBe('Great service!');
    });
  });

  describe('getAllTestimonialForArtisan', () => {
    test('should get all testimonials for a specific artisan', async () => {
      Artisan.findByPk.mockResolvedValue({ id: 1 });
      Testimonial.findAll.mockResolvedValue([{ id: 1, content: 'Great service!', stars: 5 }]);

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(201);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].content).toBe('Great service!');
    });

    test('should return 404 if artisan not found', async () => {
      Artisan.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get('/artisan/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Aucun artisan trouvé.');
    });
  });

  describe('getATestimonial', () => {
    test('should get a specific testimonial by id', async () => {
      Testimonial.findOne.mockResolvedValue({ id: 1, content: 'Great service!', stars: 5 });

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(201);
      expect(response.body.content).toBe('Great service!');
    });

    test('should return 404 if testimonial not found', async () => {
      Testimonial.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Temoignage non trouvé.');
    });
  });
});
