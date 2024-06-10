const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/register')
    .post(artisanController.registerAnArtisan)

router
    .route('/login')
    .post(artisanController.loginAnArtisan)

router
    .route('/')
    .all(jwtMiddleware.verifyTokenArtisan)
    .get(artisanController.getAnArtisan)
    .put(artisanController.putAnArtisan)
    .delete(artisanController.deleteAnArtisan)

router
    .route('/updatePassword')
    .all(jwtMiddleware.verifyTokenArtisan)
    .put(artisanController.updatePassword)

router
    .route('/:id_job/:postalcode')
    .get(artisanController.getAllArtisansFiltre)

router
    .route('/allArtisan')
    .get(artisanController.getAllArtisans)


module.exports = router;