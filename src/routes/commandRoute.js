const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/:id_artisan')
    .all(jwtMiddleware.verifyTokenUser)
    .post(commandController.createACommand)


router
    .route('/:id_command')
    .all(jwtMiddleware.verifyTokenUser)
    .put(commandController.putACommand)