const express = require('express');
const router = express.Router();
const adressController = require('../controllers/adressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/register')
    .post(adressController.createAnAdress)