const express = require('express');
const router = express.Router();
const addressController = require('../controllers/adressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/:id_address')
    .get(addressController.getAddress)

module.exports = router;