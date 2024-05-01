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
    .all(jwtMiddleware.verifyToken)
    .get(artisanController.getAnArtisan)
    .put(artisanController.putAnArtisan)
    .delete(artisanController.deleteAnArtisan)