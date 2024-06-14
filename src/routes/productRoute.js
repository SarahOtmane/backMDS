const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const productController = require('../controllers/productController');



router
    .route('/')
    .all(jwtMiddleware.verifyTokenArtisan)
    .post(productController.createAProduct)

router
    .route('/artisan/:id_artisan')
    .get(productController.getAllProductsArtisan)
    
router 
    .route('/:id_artisan/:id_prestation')
    .get(productController.getPrestaProduct)

router 
    .route('/:id_product')
    .get(productController.getAProduct)

router
    .route('/:id_product')
    .all(jwtMiddleware.verifyTokenArtisan)
    .put(productController.updateAProduct)
    .delete(productController.deleteAProduct)




module.exports = router;

