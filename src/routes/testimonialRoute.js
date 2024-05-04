const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/:id_artisan')
    .all(jwtMiddleware.verifyToken)
    .post(testimonialController.createATestimonial)


router
    .route('/:id_testimonial')
    .get(testimonialController.getATestimonial)
    .put(jwtMiddleware.verifyToken, testimonialController.putATestimonial)
    .delete(jwtMiddleware.verifyToken, testimonialController.deleteATestimonial);




/**********************************************************
            ROUTES UNIQUEMENT POUR LES ADMINS
**********************************************************/ 

router
    .route('/:id_testimonial')
    .all(jwtMiddleware.isAdmin)
    .delete(testimonialController.deleteATestimonial);

module.exports = router;