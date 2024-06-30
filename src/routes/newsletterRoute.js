const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .post(newsletterController.addInNewsletter)


router
    .route('/')
    // .all(jwtMiddleware.isAdmin)
    .get(newsletterController.getAllInNewsletter)


module.exports = router;