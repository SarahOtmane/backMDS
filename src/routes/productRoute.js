const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const productController = require('../controllers/productController');


router 
    .route('/:id_product')
    .get(productController.getAProduct)

router
    .route('/artisan/:id_artisan')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(productController.getAllProductsArtisan)
    .post(productController.createAProduct)

module.exports = router;