const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/register')
    .post(personController.registerAUser)