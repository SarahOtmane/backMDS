const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const prestationArtisanController = require('../controllers/prestationArtisanController');



router
    .route('/')
    .all(jwtMiddleware.verifyTokenArtisan)
    .post(prestationArtisanController.createAPrestaArtisan)
    .put(prestationArtisanController.updateAPrestaArtisan)
    .delete(prestationArtisanController.deleteAPrestaArtisan)
    .get(prestationArtisanController.getAllPrestaArtisan)



module.exports = router;

