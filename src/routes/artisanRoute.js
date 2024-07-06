const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');


router
    .route('/:name_job/:postalcode')
    .get(artisanController.getAllArtisansWithFiltre)

router
    .route('/:id_artisan')
    .get(artisanController.getDetailArtisan)

module.exports = router;