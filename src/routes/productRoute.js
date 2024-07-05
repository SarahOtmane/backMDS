const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const JwtMiddlare = require('../middlewares/jwtMiddleware');
const jwtMiddleware =  new JwtMiddlare()

router 
    .route('/:id_product')
    .get(productController.getAProduct)

router
    .route('/:id_product')
    .all(jwtMiddleware.verifyTokenArtisan)
    .put(productController.updateAProduct)
    .delete(productController.deleteAProduct)

router
    .route('/artisan/:id_artisan')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(productController.getAllProductsArtisan)
    .post(productController.createAProduct)

router 
    .route('/:id_artisan/:id_prestation')
    .get(productController.getPrestaProduct)

module.exports = router;