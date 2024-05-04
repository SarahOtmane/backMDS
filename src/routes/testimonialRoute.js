const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(testimonialController.createATestimonial)
    .get(testimonialController.getATestimonial)
    .put(testimonialController.putATestimonial)
    .delete(testimonialController.deleteATestimonial);



module.exports = router;