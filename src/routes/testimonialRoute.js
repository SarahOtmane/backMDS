const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(testimonialController.createATestimonial)
    // .get(testimonialController.getAJob)
    // .put(testimonialController.putAJob)
    // .delete(testimonialController.deleteAJob);



module.exports = router;