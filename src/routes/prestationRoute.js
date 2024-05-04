const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const prestationController = require('../controllers/prestationController.js');


router
    .route('/')
    .all(jwtMiddleware.isAdmin)
    .post(prestationController.createAPrestation)

router
    .route('/:id')
    .get(prestationController.getAPrestation)


module.exports = router;