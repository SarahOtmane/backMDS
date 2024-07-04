const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const AddressController = require('../controllers/adressController');


router
    .route('/:id_address')
    .get(AddressController.getAddress)

module.exports = router;